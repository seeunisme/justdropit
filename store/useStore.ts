import create from 'zustand';

interface State {
  data: string | null;
  isData: () => boolean;
}

export const useGlobalStore = create<State>((set, get) => ({
  data: null,
  isData: () => get().data !== null,
}));
