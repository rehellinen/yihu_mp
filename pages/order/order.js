import { CartModel } from '../cart/cart-model.js'
import { EditInfoModel } from '../edit-info/edit-info-model.js'
import { OrderModel } from './order-model.js'
let cart = new CartModel()
let edit = new EditInfoModel()
let order = new OrderModel()

Page({
  data: {
    
  },

  // onLoad获取购物车选中的商品及其相关信息
  onLoad: function (options) {
    let goods = cart.getCartDataFromLocal(true)

    this.setData({
      totalPrice : options.totalPrice,
      goods: goods,
    })
  },  

  onShow(){
    edit.getBuyerInfo((res) => {
      let isCompleted = this.isBuyerInfoCompleted(res)
      this.setData({
        buyerInfo: res,
        isCompleted: isCompleted
      })
    })
  },

  // 点击支付按钮
  pay(event){
    if (!this.data.isCompleted){
      this.showTips('提示', '请先完善个人信息哦~')
      return 0
    }
    this._pay()       
  },

  _pay(){
    let orderInfo = []
    let goodsInfo = this.data.goods
    
    // 订单中商品的信息
    for (let i = 0; i < goodsInfo.length; i++){
      orderInfo.push({
        goods_id: goodsInfo[i].id,
        count: goodsInfo[i].count
      })
    }
    let that = this
    order.placeOrder(orderInfo, (res) => {
      if(res.pass){
        let id = res.order_id
        this._execPay(id)
      }else{
        this._orderFail(res)
      }
    })
  },

  // 进行支付
  _execPay(id){
    let that = this
    order.execPay(id, (statusCode, data) => {
      if(statusCode != 0){
        that.deleteGoods()
        let flag = statusCode == 2
        wx.redirectTo({
          url: '../pay-result/pay-result?id=' + id + '&flag=' + flag, 
        })
      }else{
        this._orderFail(data)
      }
    })
  },

  // 下单失败
  _orderFail(data){
    let nameArr = []
    let name = ''
    let str = ''
    let goods = data.goodsStatusArray

    for(let i = 0; i < goods.length; i++){
      if(!goods[i].haveStock){
        name = goods[i].name
        if(name.length > 15){
          name = name.substr(0, 12) + '...'
        }
        nameArr.push(name)
        if(nameArr.length > 2){
          break;
        }
      }
    }
    str += nameArr.join('、')
    if(nameArr.length > 2){
      str += '等'
    }
    str += '缺货'
    this.showTips('下单失败', str)
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
  },

  // 删除购物车中已经下单的商品
  deleteGoods(){
    let ids = []
    let goods = this.data.goods
    for(let i = 0; i < goods.length; i++){
      ids.push(goods[i].id)
    }
    cart.delete(ids)
  },

  // 对showModal方法进行封装
  showTips(title, content) {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      success(res) {
        
      }
    })
  }  
})