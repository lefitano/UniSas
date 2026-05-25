import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/ui/TopBar'
import {
  getUsuario, getIniciais, avatarCores,
  getUsuarios, removerUsuario,
} from '../utils/usuario'
import dashStyles from './Dashboard.module.css'
import styles from './Gerenciar.module.css'

const labelPerfil = { aluno: 'Aluno', professor: 'Professor', responsavel: 'Responsável' }

export default function GerenciarUsuariosPage() {
  const navigate = useNavigate()
  const [diretor, setDiretor]         = useState(null)
  const [usuarios, setUsuarios]       = useState([])
  const [filtro, setFiltro]           = useState('todos')
  const [confirmandoId, setConfirmandoId] = useState(null)

  useEffect(() => {
    async function carregar() {
      const dados = getUsuario()
      if (!dados || dados.perfil !== 'diretor') { navigate('/'); return }
      setDiretor(dados)

      const lista = await getUsuarios()
      setUsuarios(lista)
    }
    carregar()
  }, [navigate])

  if (!diretor) return null

  const usuariosFiltrados = filtro === 'todos'
    ? usuarios
    : usuarios.filter(u => u.perfil === filtro)

  async function handleRemover(id) {
    await removerUsuario(id)
    setUsuarios(prev => prev.filter(u => u.id !== id))
    setConfirmandoId(null)
  }

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
            <h1 className={styles.titulo}>Gerenciar Usuários</h1>
          </div>
          <button className={styles.btnNovo} onClick={() => navigate('/gerenciar-usuarios/novo')}>
            + Novo usuário
          </button>
        </div>

        <div className={styles.filtros}>
          {['todos', 'aluno', 'professor', 'responsavel'].map(f => (
            <button
              key={f}
              className={`${styles.filtroBtn} ${filtro === f ? styles.filtroBtnAtivo : ''}`}
              onClick={() => { setFiltro(f); setConfirmandoId(null) }}
            >
              {f === 'todos' ? 'Todos' : labelPerfil[f]}
              <span className={styles.filtroCount}>
                {f === 'todos' ? usuarios.length : usuarios.filter(u => u.perfil === f).length}
              </span>
            </button>
          ))}
        </div>

        <div className={styles.lista}>
          {usuariosFiltrados.length === 0 && (
            <p className={styles.vazio}>Nenhum usuário encontrado.</p>
          )}

          {usuariosFiltrados.map(u => (
            <div key={u.id} className={styles.usuarioCard}>
              <div className={styles.usuarioAvatar} style={{ background: avatarCores[u.perfil] }}>
                {getIniciais(u.nome)}
              </div>

              <div className={styles.usuarioInfo}>
                <p className={styles.usuarioNome}>{u.nome}</p>
                <p className={styles.usuarioEmail}>{u.email}</p>
              </div>

              <span className={`${styles.perfilBadge} ${styles[`badge_${u.perfil}`]}`}>
                {labelPerfil[u.perfil]}
              </span>

              <div className={styles.acoes}>
                {confirmandoId === u.id ? (
                  <>
                    <span className={styles.confirmarTexto}>Remover?</span>
                    <button className={styles.btnConfirmar} onClick={() => handleRemover(u.id)}>Sim</button>
                    <button className={styles.btnCancelarAcao} onClick={() => setConfirmandoId(null)}>Não</button>
                  </>
                ) : (
                  <>
                    <button
                      className={styles.btnEditar}
                      onClick={() => navigate(`/gerenciar-usuarios/editar/${u.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className={styles.btnRemover}
                      onClick={() => setConfirmandoId(u.id)}
                    >
                      Remover
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
