import { useReducer } from 'react';
import { Action, FromLanguage, Language, State } from '../types'
// 1° paso: crear stado inicial
const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

// 2° paso: crear un reducer, este recive un state y un action
function reducer(state: State, action: Action) {
  const { type } = action;
  if (type === 'INTERCHANGE_LANGUAGES') {
    // un reducer siempre tiene que devolver un nuevo estado
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }

  if (type === 'SET_FROM_LANGUAGES') {
    return {
      ...state,
      fromLanguage: action.payload
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    return {
      ...state,
      toLanguages: action.payload
    }
  }

  if (type === 'SET_FROM_TEXT') {
    return {
      ...state,
      loading: true,
      fromText: action.payload,
      result: ''
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload
    }
  }

  return state
}

export function useStore() {
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  // el dispatch no se tiene que ver en los componentes, para evitar esto, podemos crear un contrato que podamos utilizar en cualquier sitio
  const interChangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }

  const setFromLanguages = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGES', payload})
  }

  const setToLanguages = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload})
  }
  
  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload})
  }
  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload})
  }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interChangeLanguages,
    setFromLanguages,
    setFromText,
    setToLanguages,
    setResult
  }
}


