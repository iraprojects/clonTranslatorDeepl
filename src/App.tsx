import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants';
import ArrowIcon from './assets/Icons'
import Head from './components/Head'
import LanguageSelector from './components/LanguageSelector'
import { SectionType } from './types.d'
import TextArea from './components/TextArea';

function App() {
  const { loading, fromLanguage, toLanguage, interChangeLanguages, setFromLanguages, setFromText, setResult, fromText, result, setToLanguages } = useStore()

  const translateText = async () => {
    try {
      const response = await fetch('http://localhost:5000/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: fromText,
          targetLang: toLanguage,
        }),
      });

      const data = await response.json();
      
      setResult(data.translation);
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  return (
    <>
      <Head />
      <Container fluid>
        <h1>Google Translate</h1>
        <Row>
          <Col>
            <h2>From</h2>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguages}
            />
            <TextArea
              placeholder='Introducir texto'
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
          </Col>
          <Col xs='auto'>
            <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} type="button" onClick={interChangeLanguages}> <ArrowIcon />
            </Button>
          </Col>
          <Col>
            <h2>To</h2>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguages}
            />
            <TextArea
              placeholder='Traducción'
              type={SectionType.To}
              value={result}
              loading={loading}
              onChange={setResult}
            />
          </Col>
          <Col xs='auto'>
            <Button variant='primary' onClick={translateText}>Translate</Button>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  )
}

export default App
