import React from 'react'
import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

interface Props {
  type: SectionType
  placeholder: string
  loading?: boolean
  onChange: (value: string) => void
  value: string
}

const commonStyles = { border: 0, height: '100px', resize: 'none' as 'none' }

const getPlaceHolder = ({type, loading}: {type: SectionType, loading?: boolean}) => {
  if (type === SectionType.From) return 'Introducir texto'
  if (loading === true) return 'Cargando...'
  return 'Traduccion'
} 

function TextArea({ type, loading, onChange, value }: Props) {
  const styles = type === SectionType.From
    ? commonStyles
    : { ...commonStyles, backgroundColor: '#f1f3f9' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      autoFocus={type === SectionType.From}
      as='textarea'
      placeholder={getPlaceHolder({type, loading})}
      style={styles}
      value={value}
      onChange={handleChange}
    />
  )
}

export default TextArea