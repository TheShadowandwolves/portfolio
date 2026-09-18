import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { PreferencesContext, readPreference, savePreference } from '../lib/preferences';
import type { Language, Theme } from '../lib/preferences';
export default function PreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => readPreference('language') === 'de' ? 'de' : 'en');
  const [theme, setTheme] = useState<Theme>(() => readPreference('theme') === 'dark' ? 'dark' : 'light');
  useEffect(() => { document.documentElement.lang = language; savePreference('language', language); }, [language]);
  useEffect(() => { document.documentElement.dataset.theme = theme; savePreference('theme', theme); }, [theme]);
  return <PreferencesContext.Provider value={{ language, theme, setLanguage, setTheme }}>{children}</PreferencesContext.Provider>;
}
