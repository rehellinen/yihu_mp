import {Base} from '../../utils/base.js'

class OrderModel extends Base{
  constructor(){
    super()
    this.key = 'newOrder'
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
        that.setNewOrderStorage(true)
        cb && cb(res)
      },
      eCallBack(res){

      }
    }

    this.request(params)
  }

  // 0->库存量不足，1->支付失败，2->支付成功
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
              cb && cb(2, res)
            },
            fail(){
              cb && cb(1, res)
            }
          })
        }else{
          cb && cb(0, res)
        }
      }
    }
    this.request(params)
  }

  // 获取订单
  getOrder(page, cb, ecb){
    let params = {
      url: 'order/user',
      callBack(res){
        cb && cb(res)
      },
      eCallBack(res){
        ecb && ecb(res)
      },
      data: {
        page: page
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

  // 判断是否有新订单
  isHasNewOrder(){
    let val = wx.getStorageSync(this.key)
    return val
  }

  // 设置newOrder的缓存
  setNewOrderStorage(value){
    wx.setStorageSync(this.key, value)
  }
}

export { OrderModel }