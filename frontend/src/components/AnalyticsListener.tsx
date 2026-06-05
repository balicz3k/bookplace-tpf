import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ga from '../utils/ga';
import hotjar from '../utils/hotjar';

const AnalyticsListener = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;
    ga.pageview(path);

    const siteId = Number(import.meta.env.VITE_HOTJAR_SITE_ID);
    if (siteId) {
      hotjar.stateChange(path);
    }

    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log('[GA4] pageview', path);
    }
  }, [location]);

  return null;
};

export default AnalyticsListener;
