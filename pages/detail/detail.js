import {DetailModel} from './detail-model.js'
import {CartModel} from '../cart/cart-model.js'
let detail = new DetailModel()
let cart = new CartModel()
let app = getApp()

Page({
  data: {
    product: {},
    selectedCount: 1,
    cartSelectedCount: 0,
    currentTabsIndex: 0,
    countArray:[],
    isTap: false,
    photoCount: 1,
    loadedPhoto: 0
  },

  onLoad: function (options) {
    this.data.id = options.id
    this.data.type = options.type 
    this._loadData()
    setTimeout(() => {
      this.setData({
        loadingHidden: true
      })
    }, 5000)
  },

  _loadData(cb){
    if (this.data.type == 1) {
      this._getGoodsAndShop(cb)
    } else {
      this._getGoodsAndSeller(cb)
    }
  },

  onShareAppMessage(res) {
    return {
      title: this.data.product.name,
      path: '/pages/detail/detail?id=' + this.data.product.id 
            + '&type=' + this.data.product.type,
      success(res) {
        wx.showToast({
          title: '分享成功',
          image: '/images/icon/pay@success.png'
        })
      },
      fail(res) {
        wx.showToast({
          title: '分享失败',
          image: '/images/icon/pay@error.png'
        })
      }
    }
  },

  _getGoodsAndShop(cb){
    detail.getGoodsDetail(this.data.id, (data) => {
      let count = data.quantity
      for (let i = 1; i <= count; i++){
        this.data.countArray.push(i)
      }
      
      this.setData({
        product: data,
        cartSelectedCount: cart.getCartTotalCount(),
        shop: data.shop,
        countArray: this.data.countArray
      })
      cb && cb()
    })
  },

  _getGoodsAndSeller(cb){
    detail.getOldGoodsDetail(this.data.id, (data) => {
      this.setData({
        product: data,
        cartSelectedCount: cart.getCartTotalCount(),
        shop: data.seller
      })
      cb && cb()
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
    let flag = this._addCartStorage()

    // 处理加入购物车的动画
    if(flag){
      this._addCartAnimation(event)
    }    
  },

  _addCartAnimation(event){
    let touches = event.touches[0];
    let relative = {
      x: '25px',
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
    // 是否成功添加商品
    let flag = true
    let tempObj = {}
    let keys = ['id', 'name', 'image_id', 'price', 'type', 'quantity']
    for (let key in this.data.product) {
      if (keys.indexOf(key) >= 0) {
        tempObj[key] = this.data.product[key]
      }
    }
    cart.add(tempObj, this.data.selectedCount, () => {
      wx.showToast({
        title: '商品库存不足',
        image: '/images/icon/pay@error.png'
      })
      flag = false
    })    
    return flag
  },

  toCartTap(){
    wx.switchTab({
      url: '../cart/cart',
    })
  },

  isLoadAll(event) {
    let that = this
    app.isLoadAll(that)
  },

  onPullDownRefresh() {
    this._loadData(() => {
      wx.stopPullDownRefresh()
    })
  }
})