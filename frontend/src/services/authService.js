

import * as api from './api.js'
import { salvarUsuario, limparUsuario } from './usuarioService.js'

export async function login(email, senha) {
 
  const resultado = await api.post('/auth/login', { email, senha }, false)


  api.salvarToken(resultado.token)


  salvarUsuario(resultado.usuario)

  return resultado.usuario
}

export function logout() {
  api.removerToken()
  limparUsuario()
}
