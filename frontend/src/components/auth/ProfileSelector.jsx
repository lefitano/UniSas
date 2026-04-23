import { useState } from 'react'
import styles from './ProfileSelector.module.css'

const perfis = [
  { id: 'ALUNO',      label: 'Aluno',       icon: '📚', desc: 'Acesso a conteúdos e atividades' },
  { id: 'PROFESSOR',  label: 'Professor',   icon: '🎓', desc: 'Gestão de turmas e conteúdo' },
  { id: 'RESPONSAVEL',label: 'Responsável', icon: '👨‍👧', desc: 'Acompanhe seu filho' },
  { id: 'DIRETOR',    label: 'Diretor',     icon: '🏫', desc: 'Gestão escolar completa' },
]

export default function ProfileSelector({ onContinuar }) {
  const [perfilSelecionado, setPerfilSelecionado] = useState(null)

  return (
    <div className={styles.card}>
      <h2 className={styles.titulo}>Selecione seu perfil</h2>
      <p className={styles.subtitulo}>Como você usa a plataforma hoje?</p>

      <div className={styles.grid}>
        {perfis.map((perfil) => (
          <button
            key={perfil.id}
            className={`${styles.perfilCard} ${perfilSelecionado === perfil.id ? styles.selecionado : ''}`}
            onClick={() => setPerfilSelecionado(perfil.id)}
          >
            <span className={styles.icone}>{perfil.icon}</span>
            <span className={styles.label}>{perfil.label}</span>
            <span className={styles.desc}>{perfil.desc}</span>
          </button>
        ))}
      </div>

      <button
        className={styles.btnContinuar}
        disabled={!perfilSelecionado}
        onClick={() => onContinuar(perfilSelecionado)}
      >
        Continuar →
      </button>
    </div>
  )
}
