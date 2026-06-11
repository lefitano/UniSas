import * as usuarioService from '../services/usuarioService.js'


export async function listar(req, res, next) {
  try {
    const pagina = req.query.pagina ? Number(req.query.pagina) : null
    const limite = req.query.limite ? Number(req.query.limite) : null
    const usuarios = await usuarioService.listarUsuarios(pagina, limite)
    res.json(usuarios)
  } catch(erro) {
    next(erro)
  }
}

export async function buscarPorId(req, res, next) {
  try{
   const {id} = req.params
   const usuario = await usuarioService.buscarUsuarioPorId(id)
   res.json(usuario)
  } catch(erro){
    next(erro)
  }
  
}

export async function criar(req, res, next) {
  try {
    const usuario = await usuarioService.criarUsuario(req.body)
    res.status(201).json(usuario)
  } catch (erro) {
    next(erro)
  }
}

export async function atualizar(req, res, next) {
  try {
    const { id } = req.params
    const usuario = await usuarioService.atualizarUsuario(id, req.body)
    res.json(usuario)
  } catch (erro) {
    next(erro)
  }
}

export async function remover(req, res, next) {
  try{
  const {id} = req.params 
  await usuarioService.removerUsuario(id)
  res.status(204).send()
  }catch(erro){
    next(erro)
  }
}
