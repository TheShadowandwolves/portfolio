import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { usePreferences } from '../lib/preferences';
export default function SiteLayout({ children, title }: { children: ReactNode; title: string }) {
  const { pathname } = useLocation();
  const { t } = usePreferences();
  useEffect(() => { document.title = `${title} | Leonard Blam`; }, [title]);
  useEffect(() => { window.scrollTo(0,0); document.getElementById('main-content')?.focus({ preventScroll: true }); }, [pathname]);
  return <><Header/><main id="main-content" tabIndex={-1} className="page-container" aria-label={t('Page content','Seiteninhalt')}>{children}</main><Footer/></>;
}
