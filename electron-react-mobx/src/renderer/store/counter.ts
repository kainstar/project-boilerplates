import { observable, action, computed } from 'mobx';

export class CounterStore {
  @observable counter = 0;

  @computed
  get nextCounter() {
    return this.counter + 1;
  }

  @action
  increment = () => {
    this.counter++;
  }

  @action
  incrementIfOdd = () => {
    if (this.counter % 2) {
      this.counter++;
    }
  }

  @action
  incrementAsync = () => {
    setTimeout(() => {
      this.counter++;
    }, 1000);
  }

  @action
  decrement = () => {
    this.counter--;
  }
}

export default new CounterStore();
