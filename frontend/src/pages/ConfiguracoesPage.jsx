import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUsuario, limparUsuario, getIniciais, avatarCores } from '../utils/usuario'
import styles from './ConfiguracoesPage.module.css'

export default function ConfiguracoesPage() {
  const navigate = useNavigate()
  const [usuario,         setUsuario]         = useState(null)
  const [confirmarExcluir, setConfirmarExcluir] = useState(false)

  useEffect(() => {
    const dados = getUsuario()
    if (!dados) { navigate('/'); return }
    setUsuario(dados)
  }, [navigate])

  if (!usuario) return null

  function handleSair() {
    limparUsuario()
    navigate('/')
  }

  function handleExcluir() {
    limparUsuario()
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

        <div className={styles.cardPerigo}>
          <p className={styles.secaoTitulo}>Zona de perigo</p>

          {!confirmarExcluir ? (
            <div className={styles.opcao}>
              <div>
                <p className={styles.opcaoTitulo}>Excluir minha conta</p>
                <p className={styles.opcaoDesc}>Esta ação é permanente e não pode ser desfeita</p>
              </div>
              <button
                className={styles.btnExcluir}
                onClick={() => setConfirmarExcluir(true)}
              >
                Excluir
              </button>
            </div>
          ) : (
            <div className={styles.confirmarBloco}>
              <p className={styles.confirmarTexto}>
                ⚠️ Tem certeza? Todos os seus dados serão removidos permanentemente.
              </p>
              <div className={styles.confirmarBtns}>
                <button className={styles.btnCancelar} onClick={() => setConfirmarExcluir(false)}>
                  Cancelar
                </button>
                <button className={styles.btnConfirmarExcluir} onClick={handleExcluir}>
                  Sim, excluir conta
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
