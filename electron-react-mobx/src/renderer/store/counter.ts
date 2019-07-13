import { observable, action, computed, runInAction } from 'mobx';

export default class CounterStore {
  @observable num = 0;

  @computed
  get nextCounter() {
    return this.num + 1;
  }

  @action
  increment = () => {
    this.num++;
  }

  @action
  incrementIfOdd = () => {
    if (this.num % 2) {
      this.num++;
    }
  }

  @action
  incrementAsync = () => {
    setTimeout(() => {
      runInAction(() => this.num++);
    }, 1000);
  }

  @action
  decrement = () => {
    this.num--;
  }
}
