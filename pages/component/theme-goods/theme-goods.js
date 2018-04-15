// pages/component/theme-goods/theme-goods.js
Component({
  properties: {
    goods: Array,
  },

  data: {

  },

  methods: {
    toLoadMore(event){
      this.triggerEvent('toLoadMore')
    },

    toDetail(event) {
      let id = event.currentTarget.dataset.id
      let type = event.currentTarget.dataset.type
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + id + '&type=' + type,
      })
    },

    loaded(event) {
      var myEventDetail = {}
      var myEventOption = {}
      this.triggerEvent('loaded', myEventDetail, myEventOption)
    }
  }
})
