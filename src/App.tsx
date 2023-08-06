import { useReducer } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Action, State } from './types'
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

function App() {
  // 3° paso: usar el hook reducer
  const [{
    fromLanguage,
    /* toLanguage,
    fromText,
    result,
    loading */
  }, dispatch] = useReducer(reducer, initialState)

  { console.log(fromLanguage) }
  return (
    <>
      <div className='App'>
        <h1>Google Translate</h1>
        <button onClick={() => {
          dispatch({ type: 'SET_FROM_LANGUAGES', payload: 'es' })
        }}>Cambiar a español</button>

        {fromLanguage}
      </div>
    </>
  )
}

export default App
