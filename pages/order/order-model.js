import {Base} from '../../utils/base.js'

class OrderModel extends Base{
  constructor(){
    super()
    this._storageKeyName = 'newOrder'
  }

  placeOrder(goods, cb){
    let that = this
    let params = {
      url: 'order',
      type: 'POST',
      data: {
        goods: goods
      },
      callBack(res){
        wx.setStorageSync(that._storageKeyName, true)
        cb && cb(res)
      },
      eCallBack(res){

      }
    }

    this.request(params)
  }
}