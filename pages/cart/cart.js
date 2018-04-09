import { CartModel } from './cart-model.js'
let cart = new CartModel()

Page({
  data: {
  
  },

  onLoad(){
       
  },

  onShow: function () {
    cart.updatePrice( () => {
      let cartData = cart.getCartDataFromLocal()
      let cartDetailInfo = this._calTotalCountAndPrice(cartData)
      this.setData({
        selectedCount: cartDetailInfo.selectedCount,
        cartData: cartData,
        selectedType: cartDetailInfo.selectedType,
        totalPrice: cartDetailInfo.totalPrice
      })
    })     
  },  

  onHide() {
    wx.setStorageSync(cart._storageKeyName, this.data.cartData)
  },

  submitOrder(event){
    wx.navigateTo({
      url: '../order/order?totalPrice=' + this.data.totalPrice + '&from=cart',
    })
  },

  selectTap(event){
    let id = event.currentTarget.dataset.id
    let selected = event.currentTarget.dataset.selected    
    let index = this._getIndexByID(id)

    this.data.cartData[index].selected = !selected
    this._updateCartData()
  },

  selectAllTap(event) {
    let selected = event.currentTarget.dataset.selected
    let data = this.data.cartData
    for (let i = 0; i < data.length; i++){
      data[i].selected = !selected
    }
    this._updateCartData()
  },

  changeCount(event){
    let id = event.currentTarget.dataset.id
    let type = event.currentTarget.dataset.type
    let index = this._getIndexByID(id)
    let count = 1

    if(type == 'plus'){
      cart.plusCount(id)      
    }else{
      count = -1
      cart.minusCount(id)
    }
    
    this.data.cartData[index].count += count
    this._updateCartData()
  },

  delete(event){
    let id = event.currentTarget.dataset.id
    let index = this._getIndexByID(id)
    this.data.cartData.splice(index, 1)
    this._updateCartData()
    // cart.delete(id)
  },
  
  // 更新购物车页面的数据
  _updateCartData(){
    let newData = this._calTotalCountAndPrice(this.data.cartData)
    this.setData({
      selectedCount: newData.selectedCount,
      cartData: this.data.cartData,
      selectedType: newData.selectedType,
      totalPrice: newData.totalPrice
    })
  },

  // 计算选择的商品总数以及总金额
  _calTotalCountAndPrice(cartData) {
    let totalPrice = 0, selectedCount = 0, selectedType = 0
    let multiple = 100
    for (let i = 0; i < cartData.length; i++) {
      if (cartData[i].selected) {
        totalPrice += (cartData[i].count * multiple) * (cartData[i].price * multiple)
        selectedCount += cartData[i].count
        selectedType++
      }
    }

    return {
      selectedCount: selectedCount,
      selectedType: selectedType,
      totalPrice: totalPrice / (multiple * multiple)
    }
  },

  // 根据商品id获取商品下标
  _getIndexByID(id){
    for (let i = 0; i < this.data.cartData.length; i++){
      if (this.data.cartData[i].id == id){
        return i
      }
    }
  },

  toDetail(event){
    let id = event.currentTarget.dataset.id
    let type = event.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id + '&type=' + type,
    })
  }
})