import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar        from '../components/ui/TopBar'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import dashStyles from './Dashboard.module.css'
import styles from './Gerenciar.module.css' 

export default function CriarQuestaoProfessor() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const dados = getUsuario()
    if (!dados || dados.perfil !== 'professor') { navigate('/'); return }
    setUsuario(dados)
  }, [navigate])

  const handleSalvarQuestao = (e) => {
    e.preventDefault()
    alert('Questão salva com sucesso no Banco de Questões!')
    navigate('/professor/banco-questoes')
  }

  if (!usuario) return null
  const disciplina = usuario.disciplina || 'Professor'

  return (
    <div className={dashStyles.pagina}>
      <TopBar
        nome={usuario.nome}
        cargo={`Professor · ${disciplina}`}
        avatarCor={avatarCores.professor}
        avatarLetras={getIniciais(usuario.nome)}
      />

      <div className={dashStyles.corpo}>
        
        
        <div className={styles.cabecalho}>
          <div>
            <button className={styles.btnVoltar} onClick={() => navigate(-1)}>
              ← Voltar
            </button>
            <h1 className={styles.titulo}>Criar Nova Questão</h1>
          </div>
        </div>

        
        <div className={styles.formCard}>
          <form onSubmit={handleSalvarQuestao} noValidate>
            
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <div className={styles.campo} style={{ flex: 1 }}>
                <label className={styles.label}>Tipo de Questão</label>
                <select className={styles.select} required>
                  <option value="multipla">Múltipla Escolha</option>
                  <option value="discursiva">Discursiva</option>
                  <option value="vf">Verdadeiro ou Falso</option>
                </select>
              </div>
              <div className={styles.campo} style={{ flex: 1 }}>
                <label className={styles.label}>Dificuldade</label>
                <select className={styles.select} required>
                  <option value="facil">Fácil</option>
                  <option value="medio">Médio</option>
                  <option value="dificil">Difícil</option>
                </select>
              </div>
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Tópico / Assunto</label>
              <input 
                className={styles.input} 
                type="text" 
                placeholder="Ex: Frações, Segunda Guerra Mundial..." 
                required 
              />
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Enunciado</label>
              <textarea 
                className={styles.input} 
                placeholder="Digite a pergunta aqui..." 
                rows="5" 
                style={{ resize: 'vertical', fontFamily: 'inherit' }}
                required
              ></textarea>
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Gabarito / Resposta Esperada</label>
              <textarea 
                className={styles.input} 
                placeholder="Insira a resposta correta ou os critérios de correção..." 
                rows="3" 
                style={{ resize: 'vertical', fontFamily: 'inherit' }}
                required
              ></textarea>
            </div>

            
            <div className={styles.botoesForm}>
              <button type="submit" className={styles.btnSalvar}>
                Salvar Questão
              </button>
              <button type="button" className={styles.btnCancelar} onClick={() => navigate(-1)}>
                Cancelar
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  )
}