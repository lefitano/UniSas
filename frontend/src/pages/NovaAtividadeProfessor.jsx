import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar        from '../components/ui/TopBar'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import dashStyles from './Dashboard.module.css'
import styles from './Gerenciar.module.css' // Importando os estilos padronizados

export default function NovaAtividadeProfessor() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const dados = getUsuario()
    if (!dados || dados.perfil !== 'professor') { navigate('/'); return }
    setUsuario(dados)
  }, [navigate])

  const handleCriarAtividade = (e) => {
    e.preventDefault()
    alert('Atividade criada e enviada para a turma com sucesso!')
    navigate('/dashboard/professor')
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
            <h1 className={styles.titulo}>Nova Atividade</h1>
          </div>
        </div>

        
        <div className={styles.formCard}>
          <form onSubmit={handleCriarAtividade} noValidate>
            
            <div className={styles.campo}>
              <label className={styles.label}>Turma de destino</label>
              <select className={styles.select} required>
                <option value="">Selecione uma turma...</option>
                <option value="9a">9º Ano A</option>
                <option value="1b">1º Ano B - Ensino Médio</option>
              </select>
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Título da atividade</label>
              <input 
                className={styles.input} 
                type="text" 
                placeholder="Ex: Lista de Exercícios 01" 
                required 
              />
            </div>

            
            <div style={{ display: 'flex', gap: '16px' }}>
              <div className={styles.campo} style={{ flex: 1 }}>
                <label className={styles.label}>Data de entrega</label>
                <input 
                  className={styles.input} 
                  type="date" 
                  required 
                />
              </div>
              <div className={styles.campo} style={{ flex: 1 }}>
                <label className={styles.label}>Valor (Pontos)</label>
                <input 
                  className={styles.input} 
                  type="number" 
                  min="0" 
                  max="100" 
                  placeholder="Ex: 10" 
                  required 
                />
              </div>
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Instruções da atividade</label>
              <textarea 
                className={styles.input} 
                placeholder="Ex: Resolvam as questões no caderno, tirem foto e anexem aqui..." 
                rows="4" 
                style={{ resize: 'vertical', fontFamily: 'inherit' }}
              ></textarea>
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Anexar material de apoio (Opcional)</label>
              <div style={{ 
                border: '1px dashed #CBD5E1', 
                padding: '24px', 
                borderRadius: '8px', 
                textAlign: 'center', 
                background: '#F8FAFC', 
                color: '#64748B', 
                cursor: 'pointer',
                marginTop: '4px'
              }}>
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>📎</span>
                Clique para adicionar um PDF ou documento
              </div>
            </div>

            
            <div className={styles.botoesForm}>
              <button type="submit" className={styles.btnSalvar}>
                Criar Atividade
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