const trackPageview = (path: string) => {
  if (typeof window === 'undefined') return;

  window._uxa = window._uxa || [];
  window._uxa.push(['trackPageview', path]);
};

export default {
  trackPageview,
};
