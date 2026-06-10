import supabase from '../config/database.js'

export async function uploadArquivo(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ erro: 'Nenhum arquivo enviado.' })
    }

    const nomeArquivo = `${Date.now()}-${Math.random().toString(36).slice(2)}.pdf`

    const { error } = await supabase.storage
      .from('atividades')
      .upload(nomeArquivo, req.file.buffer, {
        contentType: 'application/pdf',
        upsert: false,
      })

    if (error) throw new Error(error.message)

    const { data } = supabase.storage
      .from('atividades')
      .getPublicUrl(nomeArquivo)

    res.json({ url: data.publicUrl })
  } catch (erro) {
    next(erro)
  }
}
