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
    }
  }
})
