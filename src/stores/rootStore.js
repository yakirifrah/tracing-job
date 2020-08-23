import { default as AppStore } from './AppStore';

export const createRootStore = () => ({
  appStore: new AppStore(),
});
