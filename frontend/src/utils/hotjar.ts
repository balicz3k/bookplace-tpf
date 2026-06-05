import Hotjar from '@hotjar/browser';

const HOTJAR_VERSION = 6;

const initialize = (siteId: number) => {
  Hotjar.init(siteId, HOTJAR_VERSION);
};

const stateChange = (path: string) => {
  Hotjar.stateChange(path);
};

export default {
  initialize,
  stateChange,
};
