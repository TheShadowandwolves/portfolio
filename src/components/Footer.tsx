import { Link } from 'react-router-dom';
import { usePreferences } from '../lib/preferences';
export default function Footer() {
  const { t } = usePreferences();
  return <footer className="site-footer"><div><Link className="footer-name" to="/">Leonard Blam<span>.</span></Link><p>{t('Software, web & thoughtful problem-solving.', 'Software, Web und durchdachte Lösungen.')}<br/>{t('Basel, Switzerland', 'Basel, Schweiz')}</p></div><div className="footer-links"><a href="https://github.com/theshadowandwolves">GitHub ↗</a><a href="https://www.linkedin.com/in/leonard-blam/">LinkedIn ↗</a><a href="mailto:work.leonardblam@gmail.com">{t('Email', 'E-Mail')} ↗</a><a href={`${import.meta.env.BASE_URL}cv/Leonard-Blam-CV-2026.pdf`} download>{t('Download CV', 'Lebenslauf herunterladen')} ↓</a></div><p className="footer-note">© {new Date().getFullYear()} Leonard Blam</p></footer>;
}
