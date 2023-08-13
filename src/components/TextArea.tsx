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

const commonStyles = { 
  border: 0, 
  height: '100px', 
  resize: 'none' as 'none',
  'border-radius': '0 0 12px 12px',
  background: '#f2f4ff',
  'font-size': 'large'
}

const getPlaceHolder = ({type, loading}: {type: SectionType, loading?: boolean}) => {
  if (type === SectionType.From) return 'Type or paste'
  if (loading === true) return 'Translating...'
  return 'Translation'
} 

function TextArea({ type, loading, onChange, value }: Props) {

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      autoFocus={type === SectionType.From}
      as='textarea'
      placeholder={getPlaceHolder({type, loading})}
      style={commonStyles}
      value={value}
      onChange={handleChange}
    />
  )
}

export default TextArea