import { createContext, useContext } from 'react';
export type Language = 'en' | 'de';
export type Theme = 'light' | 'dark';
export const PreferencesContext = createContext({ language: 'en' as Language, theme: 'light' as Theme, setLanguage: (_value: Language) => { void _value; }, setTheme: (_value: Theme) => { void _value; } });
export function usePreferences() {
  const preferences = useContext(PreferencesContext);
  return { ...preferences, t: (en: string, de: string) => preferences.language === 'de' ? de : en };
}
export function readPreference(key: string) { try { return localStorage.getItem(key); } catch { return null; } }
export function savePreference(key: string, value: string) { try { localStorage.setItem(key, value); } catch { /* Preferences still work for this visit. */ } }
