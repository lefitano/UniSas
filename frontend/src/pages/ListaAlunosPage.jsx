import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/ui/TopBar'
import { getUsuario, getUsuarios, getIniciais, avatarCores } from '../utils/usuario'
import dashStyles from './Dashboard.module.css'
import styles from './Gerenciar.module.css'

export default function ListaAlunosPage() {
  const navigate = useNavigate()
  const [diretor, setDiretor]   = useState(null)
  const [alunos, setAlunos]     = useState([])
  const [busca, setBusca]       = useState('')
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro]         = useState('')

  useEffect(() => {
    async function carregar() {
      const dados = getUsuario()
      if (!dados || dados.perfil !== 'diretor') { navigate('/'); return }
      setDiretor(dados)
      try {
        const lista = await getUsuarios()
        setAlunos(lista.filter(u => u.perfil === 'aluno'))
      } catch {
        setErro('Erro ao carregar alunos. Tente recarregar a página.')
      } finally {
        setCarregando(false)
      }
    }
    carregar()
  }, [navigate])

  if (!diretor) return null

  const alunosFiltrados = busca.trim()
    ? alunos.filter(a =>
        a.nome.toLowerCase().includes(busca.toLowerCase()) ||
        a.email.toLowerCase().includes(busca.toLowerCase())
      )
    : alunos

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
            <h1 className={styles.titulo}>Alunos <span style={{ fontWeight: 400, fontSize: 14, color: 'var(--cinza-texto)' }}>({alunos.length})</span></h1>
          </div>
          <button className={styles.btnNovo} onClick={() => navigate('/gerenciar-usuarios/novo')}>
            + Novo aluno
          </button>
        </div>

        <input
          className={styles.input}
          type="text"
          placeholder="Buscar por nome ou e-mail..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          style={{ marginBottom: 16 }}
        />

        <div className={styles.lista}>
          {erro       && <p className={styles.erro}>{erro}</p>}
          {carregando && <p className={styles.vazio}>Carregando alunos...</p>}
          {!carregando && !erro && alunosFiltrados.length === 0 && (
            <p className={styles.vazio}>
              {busca ? 'Nenhum aluno encontrado para essa busca.' : 'Nenhum aluno cadastrado.'}
            </p>
          )}

          {alunosFiltrados.map(a => (
            <div key={a.id} className={styles.usuarioCard}>
              <div className={styles.usuarioAvatar} style={{ background: avatarCores.aluno }}>
                {getIniciais(a.nome)}
              </div>

              <div className={styles.usuarioInfo}>
                <p className={styles.usuarioNome}>{a.nome}</p>
                <p className={styles.usuarioEmail}>
                  {a.email}{a.matricula ? ` · Matrícula ${a.matricula}` : ''}
                </p>
              </div>

              <span className={`${styles.perfilBadge} ${styles.badge_aluno}`}>Aluno</span>

              <div className={styles.acoes}>
                <button
                  className={styles.btnEditar}
                  onClick={() => navigate(`/gerenciar-usuarios/editar/${a.id}`)}
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
