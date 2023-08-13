import { Form } from "react-bootstrap"
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import React from "react"
import { FromLanguage, Language, SectionType } from "../types.d"

type Props =
  | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
  | { type: SectionType.To, value: Language, onChange: (language: Language) => void }

function LanguageSelector({ onChange, type, value }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }
  
  return (
    <Form.Select aria-label="Detect language" onChange={handleChange} value={value} bsPrefix="select-custom" size="lg">
      { type === SectionType.From && <option value={AUTO_LANGUAGE}>Detect language</option> }
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