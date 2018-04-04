 import { OrderModel } from '../order/order-model.js'
let order = new OrderModel()

Page({
  data: {
  
  },

  onLoad: function (options) {
    let id = options.id
    order.getOrderByID(id, (res) =>{
      this.setData({
        order: res
      })
    })
  },

  pay(event){
    let id = this.data.order.id
    order.execPay(id, (statusCode, res) => {
      if (statusCode != 0) {
        let flag = statusCode == 2
        wx.redirectTo({
          url: '../pay-result/pay-result?id=' + id + '&flag=' + flag,
        })
      }else{
        this._orderFail(res)
      }
    }) 
  },

  // 下单失败
  _orderFail(data) {
    let nameArr = []
    let name = ''
    let str = ''
    let goods = data.goodsStatusArray

    for (let i = 0; i < goods.length; i++) {
      if (!goods[i].haveStock) {
        name = goods[i].name
        if (name.length > 15) {
          name = name.substr(0, 12) + '...'
        }
        nameArr.push(name)
        if (nameArr.length > 2) {
          break;
        }
      }
    }
    str += nameArr.join('、')
    if (nameArr.length > 2) {
      str += '等'
    }
    str += '缺货'
    wx.showModal({
      title: '库存不足，无法支付',
      content: str,
      showCancel: false
    })
  },
})