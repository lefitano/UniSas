import * as turmaService from '../services/turmaService.js'

export async function minhas(req, res, next) {
  try {
    const turmas = await turmaService.listarTurmasPorProfessor(req.usuario.id)
    res.json(turmas)
  } catch (erro) {
    next(erro)
  }
}

export async function listar(req, res, next) {
  try {
    const pagina = req.query.pagina ? Number(req.query.pagina) : null
    const limite = req.query.limite ? Number(req.query.limite) : null
    const turmas = await turmaService.listarTurmas(pagina, limite)
    res.json(turmas)
  } catch (erro) {
    next(erro)
  }
}

export async function buscarPorId(req, res, next) {
  try {
    const { id } = req.params
    const turma = await turmaService.buscarTurmaPorId(id)
    res.json(turma)
  } catch (erro) {
    next(erro)
  }
}

export async function criar(req, res, next) {
  try {
    const turma = await turmaService.criarTurma(req.body)
    res.status(201).json(turma)
  } catch (erro) {
    next(erro)
  }
}

export async function atualizar(req, res, next) {
  try {
    const { id } = req.params
    const turma = await turmaService.atualizarTurma(id, req.body)
    res.json(turma)
  } catch (erro) {
    next(erro)
  }
}

export async function remover(req, res, next) {
  try {
    const { id } = req.params
    await turmaService.removerTurma(id)
    res.status(204).send()
  } catch (erro) {
    next(erro)
  }
}

export async function listarAlunos(req, res, next) {
  try {
    const alunos = await turmaService.listarAlunosDaTurma(req.params.id)
    res.json(alunos)
  } catch (erro) {
    next(erro)
  }
}

export async function vincular(req, res, next) {
  try {
    await turmaService.vincularAluno(req.params.alunoId, req.params.id)
    res.status(204).send()
  } catch (erro) {
    next(erro)
  }
}

export async function desvincular(req, res, next) {
  try {
    await turmaService.desvincularAluno(req.params.alunoId)
    res.status(204).send()
  } catch (erro) {
    next(erro)
  }
}
