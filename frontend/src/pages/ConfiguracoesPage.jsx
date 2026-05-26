import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import { logout } from '../services/authService'
import styles from './ConfiguracoesPage.module.css'

export default function ConfiguracoesPage() {
  const navigate = useNavigate()
  const [usuario,         setUsuario]         = useState(null)

  useEffect(() => {
    const dados = getUsuario()
    if (!dados) { navigate('/'); return }
    setUsuario(dados)
  }, [navigate])

  if (!usuario) return null

  function handleSair() {
    logout()
    navigate('/')
  }

  const perfilLabel = {
    aluno:      'Aluno',
    professor:  'Professor',
    responsavel:'Responsável',
    diretor:    'Diretor',
  }

  return (
    <div className={styles.pagina}>
      <div className={styles.topbar}>
        <button className={styles.btnVoltar} onClick={() => navigate(`/dashboard/${usuario.perfil}`)}>
          ← Voltar
        </button>
        <span className={styles.topbarTitulo}>Configurações</span>
        <div />
      </div>

      <div className={styles.conteudo}>
        <div className={styles.card}>
          <div className={styles.usuarioBloco}>
            <div className={styles.avatar} style={{ background: avatarCores[usuario.perfil] }}>
              {getIniciais(usuario.nome)}
            </div>
            <div>
              <p className={styles.usuarioNome}>{usuario.nome}</p>
              <p className={styles.usuarioEmail}>{usuario.email}</p>
              <span className={styles.badge}>{perfilLabel[usuario.perfil]}</span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <p className={styles.secaoTitulo}>Conta</p>

          <div className={styles.opcao}>
            <div>
              <p className={styles.opcaoTitulo}>Editar perfil</p>
              <p className={styles.opcaoDesc}>Alterar nome, e-mail e dados cadastrais</p>
            </div>
            <button
              className={styles.btnSecundario}
              onClick={() => navigate('/perfil/editar')}
            >
              Editar
            </button>
          </div>

          <div className={styles.divisor} />

          <div className={styles.opcao}>
            <div>
              <p className={styles.opcaoTitulo}>Sair da conta</p>
              <p className={styles.opcaoDesc}>Você será redirecionado para a tela inicial</p>
            </div>
            <button className={styles.btnSair} onClick={handleSair}>
              Sair
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
