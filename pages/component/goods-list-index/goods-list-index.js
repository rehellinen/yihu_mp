// pages/component/goods-list-index/goods-list-index.js
Component({
  properties: {
    goods: Array
  },

  data: {

  },

  methods: {
    loaded(event) {
      var myEventDetail = {}
      var myEventOption = {}
      this.triggerEvent('loaded', myEventDetail, myEventOption)
    },

    detailTap(event) {
      let id = event.currentTarget.dataset.id
      let type = event.currentTarget.dataset.type
      wx.navigateTo({
        url: '../detail/detail?id=' + id + '&type=' + type,
      })
    }
  }
})
