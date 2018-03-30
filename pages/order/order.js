import {CartModel} from '../cart/cart-model.js'
import {EditInfoModel} from '../edit-info/edit-info-model.js'
let cart = new CartModel()
let edit = new EditInfoModel()

Page({
  data: {
  
  },

  // onLoad获取购物车选中的商品及其相关信息
  onLoad: function (options) {
    let goods = cart.getCartDataFromLocal(true)

    this.setData({
      totalPrice : options.totalPrice,
      goods: goods,
      orderStatus: 0
    })
  },

  // onShow获取用户信息
  onShow(){
    edit.getBuyerInfo((res) => {
      let isCompleted = this.isBuyerInfoCompleted(res)
      this.setData({
        buyerInfo: res,
        isCompleted: isCompleted
      })
    })
  },

  // 跳转修改个人信息的页面
  editInfo(event){
    wx.navigateTo({
      url: '../edit-info/edit-info?from=order',
    })
  },

  // 点击支付按钮
  pay(event){
    if (!this.data.isCompleted){
      this.showTips('提示', '请先完善个人信息哦~')
      return 0
    }
    if(this.data.orderStatus == 0){
      this._firstTimePay()
    }else{
      this._oneMoreTimePay()
    }
  },

  _firstTimePay(){
    let orderInfo = []
    let goodsInfo = this.data.goods
    let order = new Order()
    // 订单中商品的信息
    for (let i = 0; i < goodsInfo.length; i++){
      orderInfo.push({
        goods_id: goodsInfo[i].id,
        count: goodsInfo[i].count
      })
    }
    let that = this
    order.doOrder()
  },

  // 对showModal方法进行封装
  showTips(title, content) {
    let that = this
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      success(res) {
        
      }
    })
  },

  // 判断用户信息是否填写完整
  isBuyerInfoCompleted(buyerInfo) {
    let flag = true
    for (let key in buyerInfo) {
      if (!buyerInfo[key]) {
        flag = false
      }
    }
    return flag
  }
})