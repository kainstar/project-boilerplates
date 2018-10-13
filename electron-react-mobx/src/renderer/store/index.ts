import counter from './counter';
export { CounterStore } from './counter';

const stores = {
  counter,
};

export type Stores = typeof stores;
export default stores;
