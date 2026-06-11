import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import supabase from '../config/database.js'
import { ErrorFactory } from '../middlewares/errorFactory.js'

export async function autenticar(email, senha) {
  const {data: usuario, error} = await supabase.from('usuarios')
  .select('*')
  .eq('email', email)
  .single()

  if(error || !usuario) throw ErrorFactory.naoAutorizado("Email ou senha incorretos")

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash)
    if(!senhaCorreta) throw ErrorFactory.naoAutorizado("Email ou senha incorretos")


      const token = jwt.sign(
        {userId : usuario.id, perfil : usuario.perfil},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
      )
      return {
        token,
        usuario: {
          id:                 usuario.id,
          nome:               usuario.nome,
          email:              usuario.email,
          perfil:             usuario.perfil,
          turma_id:           usuario.turma_id            || null,
          matricula:          usuario.matricula            || null,
          codigo_aluno:       usuario.codigo_aluno         || null,
          disciplina:         usuario.disciplina           || null,
          registro_funcional: usuario.registro_funcional   || null,
          escola:             usuario.escola               || null,
        }
      }
}

export async function cadastrarDiretor({ nome, email, senha, cpf, escola }) {
  const { data: existente } = await supabase
    .from('usuarios')
    .select('id')
    .eq('email', email)
    .single()

  if (existente) throw ErrorFactory.conflito('Já existe uma conta com esse e-mail.')

  const senha_hash = await bcrypt.hash(senha, 10)

  const { data: usuario, error } = await supabase
    .from('usuarios')
    .insert({ nome, email, senha_hash, perfil: 'diretor', cpf, escola })
    .select('id, nome, email, perfil')
    .single()

  if (error) throw ErrorFactory.invalido(error.message)

  const token = jwt.sign(
    { userId: usuario.id, perfil: usuario.perfil },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )

  return {
    token,
    usuario: {
      id:     usuario.id,
      nome:   usuario.nome,
      email:  usuario.email,
      perfil: usuario.perfil,
    }
  }
}

export async function encerrarSessao() {
  return { mensagem: 'Sessão encerrada' }
}
