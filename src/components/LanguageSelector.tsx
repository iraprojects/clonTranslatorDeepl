import { Form } from "react-bootstrap"
import { SUPPORTED_LANGUAGES } from '../constants'
import React from "react"
import { FromLanguage, Language } from "../types"

type Props =
  | { type: 'from', value: FromLanguage, onChange: (language: FromLanguage) => void }
  | { type: 'to', value: Language, onChange: (language: Language) => void }

function LanguageSelector({ onChange, type, value }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language) // el string tratarlo como un lenguaje
  }
  
  return (
    <Form.Select aria-label="Selecciona el idioma" onChange={handleChange} value={value}>
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))
      }
    </Form.Select>
  )
}

export default LanguageSelector