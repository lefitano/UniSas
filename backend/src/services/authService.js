import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import supabase from '../config/database.js'

export async function autenticar(email, senha) {
  const {data: usuario, error} = await supabase.from('usuarios')
  .select('*')
  .eq('email', email)
  .single()

  if(error || !usuario) throw new Error("Email ou snha incorretos")

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash)
    if(!senhaCorreta) throw new Error("Email ou senha incorretos")


      const token = jwt.sign(
        {userId : usuario.id, perfil : usuario.perfil},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
      )
      return {
        token,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          perfil: usuario.perfil
        }
      }
}

export async function encerrarSessao(token) {
  return { mensagem: 'Sessão encerrada'}
}
