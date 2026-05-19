import * as authService from '../services/authService.js'

export async function login(req, res, next) {
  try{
    const {email, senha} = req.body
    const resultado = await authService.autenticar(email, senha)
    res.json(resultado)

  }catch(erro){
    next(erro)
  }
}

export async function logout(req, res, next) {
  try{
    const resultado = await authService.encerrarSessao()
    res.json(resultado)

  }catch(erro){
    next(erro)
  }
}
