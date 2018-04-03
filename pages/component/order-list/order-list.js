// pages/component/order-overview/order-overview.js
Component({
  properties: {
    order: Object
  },

  data: {

  },

  methods: {
    toOrderMore(event){
      let id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/order-detail/order-detail?id=' + id,
      })
    }
  }
})
