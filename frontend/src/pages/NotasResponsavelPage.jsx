import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/ui/TopBar'
import TabNav from '../components/dashboard/TabNav'
import { getUsuario, getUsuarios, getIniciais, avatarCores } from '../utils/usuario'
import { getNotasDoAluno } from '../services/notaService'
import dashStyles from './Dashboard.module.css'
import styles from './Gerenciar.module.css'

export default function NotasResponsavelPage() {
  const navigate = useNavigate()
  const [responsavel, setResponsavel] = useState(null)
  const [notas, setNotas]             = useState([])
  const [carregando, setCarregando]   = useState(true)
  const [erro, setErro]               = useState('')

  useEffect(() => {
    async function carregar() {
      const dados = getUsuario()
      if (!dados || dados.perfil !== 'responsavel') { navigate('/'); return }
      setResponsavel(dados)

      const codigoAluno = dados.codigo_aluno || dados.codigoAluno
      if (!codigoAluno) { setCarregando(false); return }

      try {
        const todos = await getUsuarios()
        const aluno = todos.find(u => u.perfil === 'aluno' && u.matricula === codigoAluno)
        if (!aluno) { setCarregando(false); return }

        const lista = await getNotasDoAluno(aluno.id)
        setNotas(lista)
      } catch {
        setErro('Erro ao carregar notas.')
      } finally {
        setCarregando(false)
      }
    }
    carregar()
  }, [navigate])

  if (!responsavel) return null

  const comNota = notas.filter(n => n.nota !== null && n.nota !== undefined)
  const media = comNota.length > 0
    ? (comNota.reduce((acc, n) => acc + Number(n.nota), 0) / comNota.length).toFixed(1)
    : null

  return (
    <div className={dashStyles.pagina}>
      <TopBar
        nome={responsavel.nome}
        cargo="Responsável"
        avatarCor={avatarCores.responsavel}
        avatarLetras={getIniciais(responsavel.nome)}
      />

      <TabNav abas={[
        { label: 'Acompanhamento', rota: '/dashboard/responsavel' },
        'Frequência',
        { label: 'Notas', rota: '/responsavel/notas' },
        'Chat com escola',
      ]} />

      <div className={dashStyles.corpo}>
        <div className={styles.cabecalho}>
          <h1 className={styles.titulo}>
            Notas
            {media && (
              <span style={{ fontWeight: 400, fontSize: 14, color: 'var(--cinza-texto)', marginLeft: 8 }}>
                · Média: <strong style={{ color: Number(media) >= 6 ? 'var(--verde)' : '#dc2626' }}>{media}</strong>
              </span>
            )}
          </h1>
        </div>

        {erro       && <p className={styles.erro}>{erro}</p>}
        {carregando && <p className={styles.vazio}>Carregando notas...</p>}

        {!carregando && !erro && notas.length === 0 && (
          <p className={styles.vazio}>Nenhuma nota registrada para o aluno.</p>
        )}

        {!carregando && notas.length > 0 && (
          <div className={styles.lista}>
            {notas.map(n => (
              <div key={n.id} className={styles.usuarioCard}>
                <div
                  className={styles.usuarioAvatar}
                  style={{
                    background: n.nota === null || n.nota === undefined
                      ? '#94a3b8'
                      : Number(n.nota) >= 6 ? 'var(--verde)' : '#dc2626',
                  }}
                >
                  {n.nota !== null && n.nota !== undefined ? String(n.nota) : '—'}
                </div>

                <div className={styles.usuarioInfo}>
                  <p className={styles.usuarioNome}>{n.atividades?.titulo ?? 'Atividade'}</p>
                  <p className={styles.usuarioEmail}>
                    {n.data_entrega
                      ? `Entregue em ${new Date(n.data_entrega).toLocaleDateString('pt-BR')}`
                      : 'Data não registrada'}
                  </p>
                </div>

                <span
                  className={styles.perfilBadge}
                  style={{
                    background: n.nota === null || n.nota === undefined
                      ? '#f1f5f9'
                      : Number(n.nota) >= 6 ? '#dcfce7' : '#fee2e2',
                    color: n.nota === null || n.nota === undefined
                      ? '#64748b'
                      : Number(n.nota) >= 6 ? 'var(--verde)' : '#dc2626',
                  }}
                >
                  {n.nota !== null && n.nota !== undefined ? `Nota: ${n.nota}` : 'Aguardando'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
