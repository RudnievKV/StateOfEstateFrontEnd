export default class DataAndCheck<T>{
  Data!: T;
  checked!: boolean;
  constructor(Data: T) {
    this.Data = Data;
    this.checked = false;
  }
}
