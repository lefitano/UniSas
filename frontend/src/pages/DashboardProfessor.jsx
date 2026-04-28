import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/ui/TopBar'
import { getUsuario, getIniciais, getSaudacao, avatarCores } from '../utils/usuario'
import styles from './Dashboard.module.css'

export default function DashboardProfessor() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const dados = getUsuario()
    if (!dados || dados.perfil !== 'professor') { navigate('/'); return }
    setUsuario(dados)
  }, [navigate])

  if (!usuario) return null

  const primeiroNome = usuario.nome.split(' ')[0]
  const disciplina   = usuario.disciplina || 'Professor'

  return (
    <div className={styles.pagina}>
      <TopBar
        nome={usuario.nome}
        cargo={`Professor · ${disciplina}`}
        avatarCor={avatarCores.professor}
        avatarLetras={getIniciais(usuario.nome)}
      />

      <div className={styles.tabs}>
        {['Início', 'Minhas turmas', 'Conteúdos', 'Banco de questões', 'Chat'].map((t, i) => (
          <span key={t} className={`${styles.tab} ${i === 0 ? styles.tabAtiva : ''}`}>{t}</span>
        ))}
      </div>

      <div className={styles.corpo}>
        <div className={styles.banner}>
          <div>
            <p className={styles.bannerTitulo}>{getSaudacao()}, Prof. {primeiroNome}! 👋</p>
            <p className={styles.bannerSub}>3 turmas ativas · 87 alunos no total</p>
          </div>
          <span className={styles.bannerBadge}>{disciplina}</span>
        </div>

        <div className={styles.cardsGrid}>
          {[
            { icon: '👥', label: 'Alunos',               valor: '87',  sub: '3 turmas ativas',  cor: 'verde' },
            { icon: '📋', label: 'Atividades abertas',   valor: '5',   sub: '2 vencem hoje',     cor: 'amarelo' },
            { icon: '🎬', label: 'Conteúdos publicados', valor: '24',  sub: 'Este semestre',     cor: 'verde' },
            { icon: '❓', label: 'Questões no banco',    valor: '142', sub: 'Disponíveis',       cor: 'amarelo' },
          ].map((card) => (
            <div key={card.label} className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles[`icon${card.cor}`]}`}>{card.icon}</div>
              <p className={styles.statLabel}>{card.label}</p>
              <p className={styles.statValor}>{card.valor}</p>
              <p className={styles.statSub}>{card.sub}</p>
            </div>
          ))}
        </div>

        <p className={styles.secaoTitulo}>Ações rápidas</p>
        <div className={styles.acoesGrid}>
          {[
            { icon: '📤', label: 'Upload de aula' },
            { icon: '📝', label: 'Nova atividade' },
            { icon: '❓', label: 'Criar questão' },
            { icon: '📊', label: 'Ver desempenho' },
          ].map((a) => (
            <div key={a.label} className={styles.acaoBtn}>
              <span className={styles.acaoIcon}>{a.icon}</span>
              <span className={styles.acaoLabel}>{a.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.listaCard}>
          <div className={styles.listaHeader}>
            <span>Minhas turmas</span><span className={styles.link}>Gerenciar</span>
          </div>
          {[
            { turma: '9º Ano B · Matemática', info: '32 alunos · Média: 7,8', badge: 'Ativa',   cor: 'badgeVerde' },
            { turma: '8º Ano A · Matemática', info: '29 alunos · Média: 6,9', badge: 'Atenção', cor: 'badgeAmarelo' },
            { turma: '7º Ano C · Matemática', info: '26 alunos · Média: 8,1', badge: 'Ativa',   cor: 'badgeVerde' },
          ].map((t) => (
            <div key={t.turma} className={styles.listaItem}>
              <div className={`${styles.liIcon} ${styles.bgVerde}`}>🏫</div>
              <div className={styles.liTexto}>
                <p className={styles.liTitulo}>{t.turma}</p>
                <p className={styles.liSub}>{t.info}</p>
              </div>
              <span className={`${styles.badge} ${styles[t.cor]}`}>{t.badge}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
