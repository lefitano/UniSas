import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar        from '../components/ui/TopBar'
import TabNav        from '../components/dashboard/TabNav'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import styles from './Dashboard.module.css'


const contatosMock = [
  { id: 1, nome: 'Coordenação Pedagógica', materia: 'Acompanhamento do Aluno', online: true, hora: '14:30', cor: '#E0F2FE', textoCor: '#0284C7' },
  { id: 2, nome: 'Secretaria Escolar', materia: 'Documentos e Matrículas', online: false, hora: 'Ontem', cor: '#FCE7F3', textoCor: '#DB2777' },
  { id: 3, nome: 'Profª. Cláudia', materia: 'Professora de Português', online: true, hora: 'Seg', cor: '#FEF3C7', textoCor: '#D97706' },
]


const SearchIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
const AttachIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
const SendIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
const MoreIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>

const EmptyChatIllustration = () => (
  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill="#F1F5F9"></path>
    <path d="M15 9h-6" stroke="#94A3B8" strokeWidth="2"></path>
    <path d="M15 13h-4" stroke="#94A3B8" strokeWidth="2"></path>
  </svg>
)

export default function ChatPageResponsavel() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)
  const [contatoAtivo, setContatoAtivo] = useState(null)
  const [novaMensagem, setNovaMensagem] = useState('')
  const [busca, setBusca] = useState('')
  
 
  const [mensagens, setMensagens] = useState([
    { id: 1, remetente: 'eu', texto: 'Boa tarde! Gostaria de saber se a reunião de pais está confirmada para sexta-feira.', hora: '14:20' },
    { id: 2, remetente: 'outro', texto: 'Olá! Boa tarde. Sim, está confirmada para as 18h no auditório principal.', hora: '14:30' }
  ])

  useEffect(() => {
    const dados = getUsuario()
    if (!dados || dados.perfil !== 'responsavel') { navigate('/'); return }
    setUsuario(dados)
  }, [navigate])

  if (!usuario) return null

  const handleEnviar = (e) => {
    e.preventDefault()
    if (!novaMensagem.trim()) return

    const msg = {
      id: Date.now(),
      remetente: 'eu',
      texto: novaMensagem,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMensagens([...mensagens, msg])
    setNovaMensagem('')
  }

  const contatosFiltrados = contatosMock.filter(c => c.nome.toLowerCase().includes(busca.toLowerCase()))

  return (
    <div className={styles.pagina} style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <TopBar
        nome={usuario.nome}
        cargo="Responsável"
        avatarCor={avatarCores.responsavel}
        avatarLetras={getIniciais(usuario.nome)}
      />

      <TabNav abas={['Acompanhamento', 'Frequência', 'Notas', 'Chat com escola']} />

      <div style={{ flex: 1, padding: '24px 32px 32px 32px', boxSizing: 'border-box', display: 'flex', gap: '24px', overflow: 'hidden' }}>
        
        {/* Lado Esquerdo: Lista de Contatos */}
        <div style={{ width: '340px', background: '#fff', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #F1F5F9' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 16px 0', color: '#1E293B' }}>Mensagens</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F1F5F9', padding: '10px 16px', borderRadius: '12px' }}>
              <SearchIcon />
              <input 
                type="text" 
                placeholder="Buscar conversa..." 
                value={busca}
                onChange={e => setBusca(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '14px', width: '100%', color: '#334155' }}
              />
            </div>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {contatosFiltrados.map(contato => {
              const isAtivo = contatoAtivo?.id === contato.id
              return (
                <div 
                  key={contato.id} 
                  onClick={() => setContatoAtivo(contato)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px', borderRadius: '12px', cursor: 'pointer', transition: '0.2s',
                    background: isAtivo ? '#F4F0FF' : 'transparent',
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: contato.cor, color: contato.textoCor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '16px', position: 'relative' }}>
                      {getIniciais(contato.nome)}
                      {contato.online && (
                        <span style={{ width: '12px', height: '12px', background: '#10B981', borderRadius: '50%', position: 'absolute', bottom: 0, right: 0, border: '2.5px solid #fff' }}></span>
                      )}
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#1E293B' }}>{contato.nome}</p>
                      <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>{contato.materia}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', color: '#94A3B8', alignSelf: 'flex-start', marginTop: '4px' }}>
                    {contato.hora}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

       
        {contatoAtivo ? (
          <div style={{ flex: 1, background: '#fff', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: contatoAtivo.cor, color: contatoAtivo.textoCor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '15px' }}>
                  {getIniciais(contatoAtivo.nome)}
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1E293B' }}>{contatoAtivo.nome}</p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>{contatoAtivo.materia}</p>
                </div>
              </div>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '8px' }}><MoreIcon /></button>
            </div>

            <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', background: '#FAFAFA' }}>
              <div style={{ textAlign: 'center', margin: '8px 0' }}>
                <span style={{ background: '#F1F5F9', color: '#64748B', fontSize: '12px', padding: '4px 12px', borderRadius: '12px', fontWeight: '500' }}>Hoje</span>
              </div>
              {mensagens.map(msg => (
                <div key={msg.id} style={{ alignSelf: msg.remetente === 'eu' ? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
                  <div style={{
                    padding: '14px 18px', 
                    background: msg.remetente === 'eu' ? '#6B52A3' : '#FFFFFF',
                    color: msg.remetente === 'eu' ? '#FFFFFF' : '#334155',
                    border: msg.remetente === 'eu' ? 'none' : '1px solid #E2E8F0',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                    borderTopLeftRadius: '16px', borderTopRightRadius: '16px',
                    borderBottomLeftRadius: msg.remetente === 'outro' ? '4px' : '16px',
                    borderBottomRightRadius: msg.remetente === 'eu' ? '4px' : '16px'
                  }}>
                    <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.5' }}>{msg.texto}</p>
                  </div>
                  <span style={{ fontSize: '11px', color: '#94A3B8', marginTop: '6px', display: 'block', textAlign: msg.remetente === 'eu' ? 'right' : 'left' }}>
                    {msg.hora}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleEnviar} style={{ padding: '16px 24px', borderTop: '1px solid #F1F5F9', background: '#fff', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex' }}><AttachIcon /></button>
              <input type="text" placeholder="Digite sua mensagem..." value={novaMensagem} onChange={(e) => setNovaMensagem(e.target.value)} style={{ flex: 1, padding: '14px 20px', borderRadius: '24px', background: '#F8FAFC', border: '1px solid transparent', outline: 'none', fontSize: '15px', color: '#1E293B' }} onFocus={(e) => e.target.style.borderColor = '#E2E8F0'} onBlur={(e) => e.target.style.borderColor = 'transparent'} />
              <button type="submit" style={{ background: '#6B52A3', border: 'none', borderRadius: '50%', width: '46px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.2s', opacity: novaMensagem.trim() ? 1 : 0.6 }}><SendIcon /></button>
            </form>
          </div>
        ) : (
          <div style={{ flex: 1, background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <EmptyChatIllustration />
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1E293B', margin: '24px 0 8px 0' }}>
              Selecione uma conversa
            </h2>
            <p style={{ margin: 0, fontSize: '15px', color: '#64748B', maxWidth: '300px', textAlign: 'center', lineHeight: '1.5' }}>
              Escolha um contato na lista ao lado para começar a enviar mensagens.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}