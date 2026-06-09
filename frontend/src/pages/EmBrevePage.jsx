import { useNavigate } from 'react-router-dom'
import TopBar from '../components/ui/TopBar'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import styles from './Dashboard.module.css'

export default function EmBrevePage() {
  const navigate  = useNavigate()
  const usuario   = getUsuario()
  const perfil    = usuario?.perfil ?? 'aluno'
  const cargoMap  = { aluno: 'Aluno', professor: `Professor · ${usuario?.disciplina || ''}`, diretor: 'Diretor', responsavel: 'Responsável' }

  return (
    <div className={styles.pagina}>
      <TopBar
        nome={usuario?.nome ?? ''}
        cargo={cargoMap[perfil] ?? ''}
        avatarCor={avatarCores[perfil] ?? avatarCores.aluno}
        avatarLetras={getIniciais(usuario?.nome ?? '')}
      />

      <div className={styles.corpo} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 320, gap: 16 }}>
        <span style={{ fontSize: 48 }}>🚧</span>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--texto)', margin: 0 }}>Em desenvolvimento</h2>
        <p style={{ fontSize: 14, color: 'var(--cinza-texto)', margin: 0 }}>Esta funcionalidade ainda não está disponível.</p>
        <button
          onClick={() => navigate(-1)}
          style={{ marginTop: 8, padding: '10px 24px', background: 'var(--primaria)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--fonte-corpo)' }}
        >
          Voltar
        </button>
      </div>
    </div>
  )
}
