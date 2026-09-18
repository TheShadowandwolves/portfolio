import { useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { usePreferences } from '../lib/preferences';
export default function Header() {
  const { language, theme, setLanguage, setTheme, t } = usePreferences();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const links = [['projects', t('Projects', 'Projekte')], ['experience', t('Experience', 'Erfahrung')], ['education', t('Education', 'Bildung')], ['skills', t('Skills', 'Fähigkeiten')], ['certificates', t('Certificates', 'Zertifikate')], ['contact', t('Contact', 'Kontakt')]];
  return <header className="site-header" onKeyDown={e => { if (e.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); } }}>
    <a className="skip-link" href="#main-content" onClick={e => { e.preventDefault(); document.getElementById('main-content')?.focus(); }}>{t('Skip to content', 'Zum Inhalt springen')}</a>
    <nav className="site-nav" aria-label={t('Main navigation', 'Hauptnavigation')}>
      <Link to="/" className="brand" onClick={() => setMenuOpen(false)}><span className="brand-mark" aria-hidden="true">LB<span>.</span></span><span>Leonard Blam</span></Link>
      <div className="nav-links desktop-nav">{links.map(([path,label]) => <NavLink key={path} to={'/'+path}>{label}</NavLink>)}</div>
      <div className="nav-tools">
        <button className="icon-button" aria-label={t('Switch to '+(theme === 'light' ? 'dark' : 'light')+' theme', theme === 'light' ? 'Dunkles Design aktivieren' : 'Helles Design aktivieren')} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ? '◐' : '☀'}</button>
        <button className="language-button" aria-label={language === 'en' ? 'Sprache auf Deutsch wechseln' : 'Switch language to English'} onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}>{language === 'en' ? 'DE' : 'EN'}</button>
        <button ref={menuButton} className="menu-button" aria-label={t(menuOpen ? 'Close menu' : 'Open menu', menuOpen ? 'Menü schliessen' : 'Menü öffnen')} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '×' : '☰'}</button>
      </div>
    </nav>
    {menuOpen && <nav id="mobile-navigation" className="mobile-navigation" aria-label={t('Mobile navigation','Mobile Navigation')}>{links.map(([path,label]) => <NavLink key={path} to={'/'+path} onClick={() => setMenuOpen(false)}>{label}</NavLink>)}</nav>}
  </header>;
}
