import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants';
import ArrorIcon from './assets/Icons'
import Head from './components/Head'
import LanguageSelector from './components/LanguageSelector'

function App() {
  // 3° paso: usar el hook reducer
  const { fromLanguage, toLanguage, interChangeLanguages, setFromLanguages, setToLanguages } = useStore()
  // Nunca meter acá la lógica
  return (
    <>
      <Head />
      <Container fluid>
        <h1>Google Translate</h1>
        <Row>
          <Col>
            <h2>From</h2>
            <LanguageSelector
              type='from'
              value={fromLanguage}
              onChange={setFromLanguages}
            />
            {fromLanguage}
          </Col>
          <Col>
            <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} type="button" onClick={interChangeLanguages}> <ArrorIcon />
            </Button>
          </Col>
          <Col>
            <h2>To</h2>
            <LanguageSelector
              type='to'
              value={toLanguage}
              onChange={setToLanguages} />
              {toLanguage}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
