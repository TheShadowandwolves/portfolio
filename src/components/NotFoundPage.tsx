import { Link } from 'react-router-dom';
import SiteLayout from './SiteLayout';
import { usePreferences } from '../lib/preferences';
export default function NotFoundPage(){const {t}=usePreferences();return <SiteLayout title="404"><div className="page-heading"><p className="eyebrow">404</p><h1>{t('Page not found','Seite nicht gefunden')}</h1><p>{t('This page may have moved. Continue with the project collection.','Diese Seite wurde möglicherweise verschoben. Weiter geht es mit den Projekten.')}</p><Link className="button primary" to="/projects">{t('View projects','Projekte ansehen')} →</Link></div></SiteLayout>;}
