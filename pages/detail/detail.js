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
    countArray:[1, 2, 3, 4, 5, 6],
    isTap: false
  },

  onLoad: function (options) {
    let id = options.id
    let kind = options.kind
    if(kind == 'goods'){
      this._getGoodsAndShop(id)
    }else{
      this._getGoodsAndSeller(id)
    }
    
  },

  _getGoodsAndShop(id){
    detail.getGoodsDetail(id, (data) => {
      this.setData({
        product: data,
        cartSelectedCount: cart.getCartTotalCount(),
        shop: data.shop
      })
    })
  },

  _getGoodsAndSeller(id){
    detail.getOldGoodsDetail(id, (data) => {
      this.setData({
        product: data,
        cartSelectedCount: cart.getCartTotalCount(),
        shop: data.seller
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

  addCartTap(event){
    // 防止快速点击
    if(this.data.isTap){
      return 0;
    }
    // 处理加入购物车的数据逻辑
    this._addCartStorage()

    // 处理加入购物车的动画
    this._addCartAnimation(event)
  },

  _addCartAnimation(event){
    let touches = event.touches[0];
    let relative = {
      x: '10px',
      y: 15 - touches.clientY + 'px'
    }
    let style = 'display: block;transform:translate(' + relative.x + ',' + relative.y + ') rotate(350deg) scale(0)';
    this.setData({
      isTap: true,
      translateStyle: style
    })

    let that = this
    setTimeout( () => {
      this.setData({
        isTap: false,
        translateStyle: 'transform: none',
        isShake: true
      })

      setTimeout( () => {
        this.setData({
          cartSelectedCount: cart.getCartTotalCount()
        })
        that.setData({
          isShake: false
        })
      }, 200)
    }, 1000)
  },

  _addCartStorage(){
    let tempObj = {}
    let keys = ['id', 'name', 'image_id', 'price']
    for (let key in this.data.product) {
      if (keys.indexOf(key) >= 0) {
        tempObj[key] = this.data.product[key]
      }
    }
    cart.add(tempObj, this.data.selectedCount)    
  },

  toCartTap(){
    wx.switchTab({
      url: '../cart/cart',
    })
  }
})