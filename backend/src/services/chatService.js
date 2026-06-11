import supabase from '../config/database.js'
import { ErrorFactory } from '../middlewares/errorFactory.js'

export async function listarMensagens(remetente, destinatario) {
  const { data, error } = await supabase
    .from('mensagens')
    .select('*')
    .or(`and(remetente_id.eq.${remetente},destinatario_id.eq.${destinatario}),and(remetente_id.eq.${destinatario},destinatario_id.eq.${remetente})`)
    .order('created_at', { ascending: true })

  if (error) throw ErrorFactory.invalido(error.message)
  return data
}

export async function enviarMensagem(dados) {
  const { data, error } = await supabase
    .from('mensagens')
    .insert([dados])
    .select()
    .single()

  if (error) throw ErrorFactory.invalido(error.message)
  return data
}