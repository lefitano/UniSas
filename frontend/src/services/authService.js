// Serviço de autenticação
// TODO (backend pronto): substituir localStorage por chamadas à API

import { limparUsuario } from './usuarioService.js'

export function logout() {
  limparUsuario()
  // TODO (backend pronto): chamar a API para encerrar a sessão no servidor
}
