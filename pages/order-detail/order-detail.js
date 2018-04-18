import { OrderModel } from '../order/order-model.js'
let order = new OrderModel()
let app = getApp()

Page({
  data: {
    loadingHidden: false,
    photoCount: 0,
    loadedPhoto: 0
  },

  onLoad: function (options) {
    let id = options.id
    let type = options.type
    order.getOrderByID(id, type, (res) =>{
      this.data.photoCount += res.snap_items.length
      if(type == 1){
        res.seller = res.shop
      }
      this.setData({
        order: res
      })
    })

    setTimeout(() => {
      this.setData({
        loadingHidden: true
      })
    }, 5000)
  },

  pay(event){
    let id = this.data.order.id
    order.execPay(id, (statusCode, res) => {
      if (statusCode != 0) {
        let flag = statusCode == 2
        wx.redirectTo({
          url: '../pay-result/pay-result?flag=' + flag,
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

  confirm(event){
    let id = event.currentTarget.dataset.id
    let that = this
    wx.showModal({
      title: '确认收货',
      content: '是否确认收货?',
      success(res){
        if(res.confirm){
          order.comfirm(id, (res) => {
            that.data.order.status = 4
            that.setData({
              order: that.data.order
            })
            wx.setStorageSync('newOrder', true)
            wx.showModal({
              title: '成功',
              content: '确认收货成功',
              showCancel: false
            })
          })
        }        
      }
    })
  },

  isLoadAll(event) {
    let that = this
    app.isLoadAll(that)
  }
})