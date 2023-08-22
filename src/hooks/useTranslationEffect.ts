import { useEffect, useState } from 'react';
import { Language, AutoLanguage } from '../types.d';

export function useTranslationEffect(
  fromText: string,
  toLanguage: Language,
  fromLanguage: Language | AutoLanguage,
  setResult: (payload: string) => void
){
  const [debouncedFromText, setDebouncedFromText] = useState('')

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDebouncedFromText(fromText)
    }, 500)

    return () => {
      clearTimeout(timeOutId)
    }

  },[fromText])

  useEffect(() => {
    
    const translateText = async () => {
      try {
        const response = await fetch('URL', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: debouncedFromText,
            targetLang: toLanguage,
            ...(fromLanguage !== 'auto' ? { sourceLang: fromLanguage } : {})
          }),
        });
  
        const data = await response.json();
        setResult(data.translation);
        console.log(fromLanguage);
        
      } catch (error) {
        console.error('Translation error:', error);
      }
    };
    translateText()
    
  },[debouncedFromText, fromLanguage, toLanguage])
}