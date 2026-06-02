import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/ui/TopBar'
import { getUsuario, getUsuarios, getIniciais, avatarCores } from '../utils/usuario'
import dashStyles from './Dashboard.module.css'
import styles from './Gerenciar.module.css'

export default function ListaProfessoresPage() {
  const navigate = useNavigate()
  const [diretor, setDiretor]       = useState(null)
  const [professores, setProfessores] = useState([])
  const [busca, setBusca]           = useState('')
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro]             = useState('')

  useEffect(() => {
    async function carregar() {
      const dados = getUsuario()
      if (!dados || dados.perfil !== 'diretor') { navigate('/'); return }
      setDiretor(dados)
      try {
        const lista = await getUsuarios()
        setProfessores(lista.filter(u => u.perfil === 'professor'))
      } catch {
        setErro('Erro ao carregar professores. Tente recarregar a página.')
      } finally {
        setCarregando(false)
      }
    }
    carregar()
  }, [navigate])

  if (!diretor) return null

  const professoresFiltrados = busca.trim()
    ? professores.filter(p =>
        p.nome.toLowerCase().includes(busca.toLowerCase()) ||
        p.email.toLowerCase().includes(busca.toLowerCase()) ||
        (p.disciplina && p.disciplina.toLowerCase().includes(busca.toLowerCase()))
      )
    : professores

  return (
    <div className={dashStyles.pagina}>
      <TopBar
        nome={diretor.nome}
        cargo={`Diretor · ${diretor.escola || 'Minha Escola'}`}
        avatarCor={avatarCores.diretor}
        avatarLetras={getIniciais(diretor.nome)}
      />

      <div className={dashStyles.corpo}>
        <div className={styles.cabecalho}>
          <div>
            <button className={styles.btnVoltar} onClick={() => navigate('/dashboard/diretor')}>
              ← Painel
            </button>
            <h1 className={styles.titulo}>
              Professores <span style={{ fontWeight: 400, fontSize: 14, color: 'var(--cinza-texto)' }}>({professores.length})</span>
            </h1>
          </div>
          <button className={styles.btnNovo} onClick={() => navigate('/gerenciar-usuarios/novo')}>
            + Novo professor
          </button>
        </div>

        <input
          className={styles.input}
          type="text"
          placeholder="Buscar por nome, e-mail ou disciplina..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          style={{ marginBottom: 16 }}
        />

        <div className={styles.lista}>
          {erro       && <p className={styles.erro}>{erro}</p>}
          {carregando && <p className={styles.vazio}>Carregando professores...</p>}
          {!carregando && !erro && professoresFiltrados.length === 0 && (
            <p className={styles.vazio}>
              {busca ? 'Nenhum professor encontrado para essa busca.' : 'Nenhum professor cadastrado.'}
            </p>
          )}

          {professoresFiltrados.map(p => (
            <div key={p.id} className={styles.usuarioCard}>
              <div className={styles.usuarioAvatar} style={{ background: avatarCores.professor }}>
                {getIniciais(p.nome)}
              </div>

              <div className={styles.usuarioInfo}>
                <p className={styles.usuarioNome}>{p.nome}</p>
                <p className={styles.usuarioEmail}>
                  {p.disciplina || 'Sem disciplina'}
                  {p.registro_funcional ? ` · RF ${p.registro_funcional}` : ''}
                </p>
              </div>

              <span className={`${styles.perfilBadge} ${styles.badge_professor}`}>
                {p.disciplina || 'Professor'}
              </span>

              <div className={styles.acoes}>
                <button
                  className={styles.btnEditar}
                  onClick={() => navigate(`/gerenciar-usuarios/editar/${p.id}`)}
                >
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
