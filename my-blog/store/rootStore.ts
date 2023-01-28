import userStore, { IUserStore } from './userStore';

export interface IStore {
  user: IUserStore;
}

export default function createStore(initialValue: any): () => IStore {
  // console.log('initialValue')
  // console.log(initialValue)
  // console.log('initialValue')
  return () => {
    return {
      user: { ...userStore(), ...initialValue?.user },
    };
  };
}
