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

  execPay(orderNumber, cb){
    let params = {
      url: 'pay/pre_order',
      type: 'POST',
      data: {id: orderNumber},
      callBack(res){
        let timeStamp = res.timeStamp
        if(timeStamp){
          wx.requestPayment({
            timeStamp: timeStamp.toString(),
            nonceStr: data.nonceStr,
            package: data.package,
            signType: data.signType,
            paySign: data.paySign,
            success(){
              cb && cb(2)
            },
            fail(){
              cb && cb(1)
            }
          })
        }else{
          cb && cb(0)
        }
      }
    }
  }
}

export { OrderModel }