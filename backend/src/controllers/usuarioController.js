import * as usuarioService from '../services/usuarioService.js'
import bcrypt from 'bcrypt'

const camposCamelParaSnake = {
  registroFuncional: 'registro_funcional',
  codigoAluno:       'codigo_aluno',
}

function normalizarCampos(dados) {
  const resultado = {}
  for (const [chave, valor] of Object.entries(dados)) {
    if (valor === undefined) continue
    const novaChave = camposCamelParaSnake[chave] ?? chave
    resultado[novaChave] = valor
  }
  return resultado
}


export async function listar(req, res, next) {
  try{
  const usuarios = await usuarioService.listarUsuarios()
  res.json(usuarios)
  }catch(erro){
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
  try{
 const dados = req.body
 const senha_hash = await bcrypt.hash(dados.senha, 10)
 const usuario = await usuarioService.criarUsuario(normalizarCampos({...dados, senha_hash, senha: undefined}))
 res.status(201).json(usuario)
  }
  catch(erro){
    next(erro)
  }
}

export async function atualizar(req, res, next) {
  try{
  const {id} = req.params
  const dados = req.body
  const usuario = await usuarioService.atualizarUsuario(id, normalizarCampos(dados))
  res.json(usuario)
  }catch(erro){
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
