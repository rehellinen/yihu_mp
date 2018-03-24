import { CartModel } from './cart-model.js'
let cart = new CartModel()

Page({
  data: {
  
  },

  onShow: function () {
    let cartData = cart.getCartDataFromLocal()
    let cartDetailInfo = this._calTotalCountAndPrice(cartData)

    this.setData({
      selectedCount: cartDetailInfo.selectedCount,
      cartData: cartData,
      selectedType: cartDetailInfo.selectedType,
      totalPrice: cartDetailInfo.totalPrice
    })
  },

  // 计算选择的商品总数以及总金额
  _calTotalCountAndPrice(cartData){
    let totalPrice = 0, selectedCount = 0, selectedType = 0
    let multiple = 100
    for(let i = 0; i < cartData.length; i++){
      if (cartData[i].selected){
        totalPrice += (cartData[i].count * multiple) * (cartData[i].price * multiple)
        selectedCount += cartData[i].count
        selectedType ++
      }
    }

    return{
      selectedCount: selectedCount,
      selectedType: selectedType,
      totalPrice: totalPrice / (multiple * multiple)
    }
  }
})