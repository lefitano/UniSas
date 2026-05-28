import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar        from '../components/ui/TopBar'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import dashStyles from './Dashboard.module.css'
import styles from './Gerenciar.module.css' // Importando os mesmos estilos da tela de usuário

export default function UploadAulaProfessor() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const dados = getUsuario()
    if (!dados || dados.perfil !== 'professor') { navigate('/'); return }
    setUsuario(dados)
  }, [navigate])

  const handleUpload = (e) => {
    e.preventDefault()
    alert('Aula publicada com sucesso! (Esta é uma simulação)')
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
            <h1 className={styles.titulo}>Upload de Aula</h1>
          </div>
        </div>

        
        <div className={styles.formCard}>
          <form onSubmit={handleUpload} noValidate>
            
            <div className={styles.campo}>
              <label className={styles.label}>Turma de destino</label>
              <select className={styles.select} required>
                <option value="">Selecione uma turma...</option>
                <option value="9a">9º Ano A</option>
                <option value="1b">1º Ano B - Ensino Médio</option>
              </select>
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Título da aula</label>
              <input 
                className={styles.input} 
                type="text" 
                placeholder="Ex: Slides sobre Equações do 2º Grau" 
                required 
              />
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Descrição ou instruções</label>
              <textarea 
                className={styles.input} 
                placeholder="Ex: Leiam o PDF antes da nossa próxima aula..." 
                rows="4" 
                style={{ resize: 'vertical', fontFamily: 'inherit' }}
              ></textarea>
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Anexar arquivo</label>
              <div style={{ 
                border: '1px dashed #CBD5E1', 
                padding: '32px', 
                borderRadius: '8px', 
                textAlign: 'center', 
                background: '#F8FAFC', 
                color: '#64748B', 
                cursor: 'pointer',
                marginTop: '4px'
              }}>
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>📁</span>
                Clique para selecionar ou arraste o arquivo aqui
              </div>
            </div>

            
            <div className={styles.botoesForm}>
              <button type="submit" className={styles.btnSalvar}>
                Publicar Aula
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