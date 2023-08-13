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
import { useTranslationEffect } from './hooks/useTranslationEffect';

function App() {
  const { 
    loading, 
    fromLanguage, 
    toLanguage, 
    interChangeLanguages, 
    setFromLanguages, 
    setFromText, 
    setResult, 
    fromText, 
    result, 
    setToLanguages 
  } = useStore()

  useTranslationEffect(fromText, toLanguage, fromLanguage, setResult)

  return (
    <>
      <Head />
      <Container fluid>
        <h1 className='h1-title'>Deepl Translator</h1>
        <Row>
          <Col>
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
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguages}
            />
            <TextArea
              placeholder='Type, paste, or translate'
              type={SectionType.To}
              value={result}
              loading={loading}
              onChange={setResult}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
