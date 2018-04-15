// pages/component/seller-info/seller-info.js
Component({
  properties: {
    wechat: String,
    phone: String,
    zhifubao: String,
    name: String,
    type: Number,
    shopID: Number
  },

  data: {

  },

  methods: {
    toShopDetail(event){
      if (this.properties.type == 1){
        wx.navigateTo({
          url: '/pages/shop-detail/shop-detail?id=' + this.properties.shopID,
        })
      }
    }
  }
})
