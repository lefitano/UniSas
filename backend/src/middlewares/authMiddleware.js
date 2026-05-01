// Middleware de autenticação
// Executado antes de qualquer rota protegida para verificar se o usuário está logado

export function verificarAuth(req, res, next) {
  // TODO: ler o token do cabeçalho da requisição
  // TODO: verificar se o token é válido
  // TODO: se válido, permitir a continuação da requisição
  // TODO: se inválido, retornar erro 401 (não autorizado)

  next() // linha temporária — remover quando implementar a autenticação
}
