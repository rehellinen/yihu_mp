import {Base} from '../../utils/base.js'

class OrderModel extends Base{
  constructor(){
    super()
    this._storageKeyName = 'newOrder'
  }

  placeOrder(goods, cb){
    let params = {
      url: 'order',
      type: 'POST',
      data: {
        goods: goods
      },
      callBack(res){
        wx.setStorageSync(this._storageKeyName, true)
        cb && cb(res)
      },
      eCallBack(res){

      }
    }

    this.request(params)
  }

  execPay(orderID, cb){
    let params = {
      url: 'preOrder',
      type: 'POST',
      data: { id: orderID },
      callBack(res){
        let timeStamp = res.timeStamp
        if(timeStamp){
          wx.requestPayment({
            timeStamp: timeStamp.toString(),
            nonceStr: res.nonceStr,
            package: res.package,
            signType: res.signType,
            paySign: res.paySign,
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
    this.request(params)
  }

  // 获取订单
  getOrder(cb){
    let params = {
      url: 'order/user',
      callBack(res){
        cb && cb(res)
      },
      data: {
        page: 1
      }
    }
    this.request(params)
  }

  // 根据订单ID获取详细信息
  getOrderByID(id, cb){
    let params = {
      url: 'order/' + id,
      callBack(res) {
        cb && cb(res)
      }
    }
    this.request(params)
  }
}

export { OrderModel }