import supabase from '../config/database.js'
import { AppError } from '../middlewares/AppError.js'

export async function listarMensagens(remetente, destinatario) {
  const { data, error } = await supabase
    .from('mensagens')
    .select('*')
    .or(`and(remetente_id.eq.${remetente},destinatario_id.eq.${destinatario}),and(remetente_id.eq.${destinatario},destinatario_id.eq.${remetente})`)
    .order('created_at', { ascending: true })

  if (error) throw new AppError(error.message, 400)
  return data
}

export async function enviarMensagem(dados) {
  const { data, error } = await supabase
    .from('mensagens')
    .insert([dados])
    .select()
    .single()

  if (error) throw new AppError(error.message, 400)
  return data
}