import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useStore }  from './hooks/useStore'

function App() {
  // 3° paso: usar el hook reducer
  const {fromLanguage, setFromLanguages} = useStore()
  return (
    <>
      <div className='App'>
        <h1>Google Translate</h1>
        <button onClick={() => {
          setFromLanguages('es')
        }}>Cambiar a español</button>
        {fromLanguage}
      </div>
    </>
  )
}

export default App
