import { useEffect, useState } from 'react';
import { Language, AutoLanguage } from '../types.d';
import axios from 'axios';

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
    const translateText = async () => {
      try {
        const response = await axios.post(
          'https://clon-translator-deepl.vercel.app/api/translate',
          {
            text: debouncedFromText,
            targetLang: toLanguage,
            ...(fromLanguage !== 'auto' ? { sourceLang: fromLanguage } : {}),
          }
        );

        const data = response.data;
        setResult(data.translation);
      } catch (error) {
        console.error('Translation error:', error);
      }
    };

    translateText();
  }, [debouncedFromText, fromLanguage, toLanguage]);
}
