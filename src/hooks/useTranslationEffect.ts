import { useEffect, useState } from 'react';
import { Language, AutoLanguage } from '../types.d';

export function useTranslationEffect(
  fromText: string,
  toLanguage: Language,
  fromLanguage: Language | AutoLanguage,
  setResult: (payload: string) => void
){
  const [debouncedFromText, setDebouncedFromText] = useState('');

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDebouncedFromText(fromText);
    }, 500);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [fromText]);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_DEEPL_API_KEY
    const translateText = async () => {
      try {
        const response = await fetch(`https://api-free.deepl.com/v2/translate?auth_key=${apiKey}&text=${encodeURIComponent(debouncedFromText)}&target_lang=${toLanguage}&source_lang=${fromLanguage}`);

        const data = await response.json();
        setResult(data.translations[0].text);
      } catch (error) {
        console.error('Translation error:', error);
      }
    };
    
    translateText();
  }, [debouncedFromText, fromLanguage, toLanguage]);
}
