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
      let type = event.currentTarget.dataset.type
      wx.navigateTo({
        url: '/pages/order-detail/order-detail?id=' + id + '&type=' + type,
      })
    },

    loaded(event) {
      var myEventDetail = {}
      var myEventOption = {}
      this.triggerEvent('loaded', myEventDetail, myEventOption)
    }
  }
})
