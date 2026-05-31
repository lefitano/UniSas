// As funções deste arquivo foram movidas para as camadas corretas:
//   Dados / CRUD   → src/services/usuarioService.js
//   Formatação     → src/utils/formatadores.js
//
// Este arquivo mantém os re-exports para não quebrar as páginas existentes.
// Ao editar uma página, troque o import para apontar direto à origem.

export {
  getUsuario,
  salvarUsuario,
  limparUsuario,
  getUsuarios,
  adicionarUsuario,
  atualizarUsuario,
  removerUsuario,
  getUsuarioPorId,
} from '../services/usuarioService.js'

export {
  getIniciais,
  getSaudacao,
  avatarCores,
} from './formatadores.js'
