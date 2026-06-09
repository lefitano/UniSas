import jwt from 'jsonwebtoken'

export function verificarAuth(req, res, next){
  const authHeader = req.headers.authorization

  if(!authHeader){
    return res.status(401).json({erro: "Token não foi fornecido"})
  }

  const partes = authHeader.split(' ')

  const token = partes[1]
try{
  const dadosDoToken = jwt.verify(token, process.env.JWT_SECRET)
  req.usuario = { ...dadosDoToken, id: dadosDoToken.userId }
  next()
}catch(erro){
  return res.status(401).json({erro: "Token inválido ou expirado"})
}
}