import { createClient } from '@supabase/supabase-js'

class SupabaseConexao {
  static #instancia = null

  #cliente

  constructor() {
    this.#cliente = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    )
    console.log('[Supabase] Nova instância criada.')
  }

  static getInstance() {
    if (!SupabaseConexao.#instancia) {
      SupabaseConexao.#instancia = new SupabaseConexao()
    }
    return SupabaseConexao.#instancia
  }

  getCliente() {
    return this.#cliente
  }
}

export { SupabaseConexao }
export default SupabaseConexao.getInstance().getCliente()
