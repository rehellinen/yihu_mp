import {DetailModel} from './detail-model.js'
import {CartModel} from '../cart/cart-model.js'
let detail = new DetailModel()
let cart = new CartModel()

Page({
  data: {
    product: {},
    selectedCount: 1,
    cartSelectedCount: 0,
    currentTabsIndex: 0,
    countArray:[1, 2, 3, 4, 5, 6]
  },

  onLoad: function (options) {
    let id = options.id
    detail.getDetail(id, (data) => {
      this.setData({
        product: data,
        cartSelectedCount: cart.getCartTotalCount()
      })
    })
  },

  onTabsItemTap(event){
    let index = event.currentTarget.dataset.index
    this.setData({
      currentTabsIndex: index
    })
  },

  pickerchange(event){
    let index = event.detail.value
    this.setData({
      selectedCount: this.data.countArray[index]
    })
  },

  addCartTap(){
    let tempObj = {}
    let keys = ['id', 'name', 'image_id', 'price']
    for (let key in this.data.product){
      if(keys.indexOf(key) >= 0){
        tempObj[key] = this.data.product[key]
      }
    }
    cart.add(tempObj, this.data.selectedCount)
    this.setData({      
      cartSelectedCount: cart.getCartTotalCount()
    })
  },

  toCartTap(){
    wx.switchTab({
      url: '../cart/cart',
    })
  }
})