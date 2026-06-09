import crypto from 'crypto'
import bcrypt from 'bcrypt'
import supabase from '../config/database.js'
import { AppError } from '../middlewares/AppError.js'

export async function solicitarRecuperacao(email) {
  const { data: usuario } = await supabase
    .from('usuarios')
    .select('id, email')
    .eq('email', email)
    .single()

  if (!usuario) throw new AppError('Nenhuma conta encontrada com esse e-mail.', 404)

  const token    = crypto.randomBytes(32).toString('hex')
  const expiraEm = new Date(Date.now() + 60 * 60 * 1000).toISOString()

  const { error } = await supabase
    .from('recuperacao_senha')
    .insert({ email, token, expira_em: expiraEm })

  if (error) throw new AppError('Erro ao gerar token de recuperação.', 500)

  return { token, link: `http://localhost:5173/redefinir-senha?token=${token}` }
}

export async function redefinirSenha(token, novaSenha) {
  const { data: registro } = await supabase
    .from('recuperacao_senha')
    .select('id, email, expira_em, usado')
    .eq('token', token)
    .single()

  if (!registro)           throw new AppError('Token inválido.', 400)
  if (registro.usado)      throw new AppError('Este link já foi utilizado.', 400)
  if (new Date(registro.expira_em) < new Date()) throw new AppError('Token expirado.', 400)

  const senha_hash = await bcrypt.hash(novaSenha, 10)

  const [{ error: errSenha }, { error: errToken }] = await Promise.all([
    supabase.from('usuarios').update({ senha_hash }).eq('email', registro.email),
    supabase.from('recuperacao_senha').update({ usado: true }).eq('id', registro.id),
  ])

  if (errSenha) throw new AppError('Erro ao atualizar a senha.', 500)
  if (errToken) throw new AppError('Erro ao invalidar o token.', 500)

  return { mensagem: 'Senha redefinida com sucesso.' }
}
