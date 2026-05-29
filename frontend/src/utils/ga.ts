import ReactGA from 'react-ga4';

type GaApi = {
  initialize: (measurementId: string) => void;
  pageview?: (path: string) => void;
  send?: (payload: { hitType: 'pageview'; page: string }) => void;
};

const gaModule = ReactGA as unknown as { default?: GaApi } & GaApi;
const ga = gaModule.default ?? gaModule;

const initialize = (measurementId: string) => {
  ga.initialize(measurementId);
};

const pageview = (path: string) => {
  if (typeof ga.pageview === 'function') {
    ga.pageview(path);
    return;
  }
  if (typeof ga.send === 'function') {
    ga.send({ hitType: 'pageview', page: path });
  }
};

export default {
  initialize,
  pageview,
};
