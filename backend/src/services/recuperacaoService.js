import crypto from 'crypto'
import bcrypt from 'bcrypt'
import supabase from '../config/database.js'
import { ErrorFactory } from '../middlewares/errorFactory.js'

export async function solicitarRecuperacao(email) {
  const { data: usuario } = await supabase
    .from('usuarios')
    .select('id, email')
    .eq('email', email)
    .single()

  if (!usuario) throw ErrorFactory.naoEncontrado('Nenhuma conta encontrada com esse e-mail.')

  const token    = crypto.randomBytes(32).toString('hex')
  const expiraEm = new Date(Date.now() + 60 * 60 * 1000).toISOString()

  const { error } = await supabase
    .from('recuperacao_senha')
    .insert({ email, token, expira_em: expiraEm })

  if (error) throw ErrorFactory.interno('Erro ao gerar token de recuperação.')

  return { token, link: `http://localhost:5173/redefinir-senha?token=${token}` }
}

export async function redefinirSenha(token, novaSenha) {
  const { data: registro } = await supabase
    .from('recuperacao_senha')
    .select('id, email, expira_em, usado')
    .eq('token', token)
    .single()

  if (!registro)           throw ErrorFactory.invalido('Token inválido.')
  if (registro.usado)      throw ErrorFactory.invalido('Este link já foi utilizado.')
  if (new Date(registro.expira_em) < new Date()) throw ErrorFactory.invalido('Token expirado.')

  const senha_hash = await bcrypt.hash(novaSenha, 10)

  const [{ error: errSenha }, { error: errToken }] = await Promise.all([
    supabase.from('usuarios').update({ senha_hash }).eq('email', registro.email),
    supabase.from('recuperacao_senha').update({ usado: true }).eq('id', registro.id),
  ])

  if (errSenha) throw ErrorFactory.interno('Erro ao atualizar a senha.')
  if (errToken) throw ErrorFactory.interno('Erro ao invalidar o token.')

  return { mensagem: 'Senha redefinida com sucesso.' }
}
