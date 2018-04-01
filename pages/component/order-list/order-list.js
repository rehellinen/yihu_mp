// pages/component/order-overview/order-overview.js
Component({
  properties: {

  },

  data: {

  },

  methods: {
    toOrderMore(event){
      wx.navigateTo({
        url: '/pages/order-detail/order-detail',
      })
    }
  }
})
