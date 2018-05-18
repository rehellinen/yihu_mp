export class DataStore {
  constructor(){
    this.loadingTimeOut = 3000
  }

  static getInstance(){
    if(!this.instance){
      this.instance = new DataStore()
    }
    return this.instance
  }
}