import CounterStore from './counter';

const stores = {
  counter: new CounterStore(),
};

// all stores class
export {
  CounterStore,
};

// all stores combine object
export type Stores = typeof stores;

// combine stores object
export default stores;
