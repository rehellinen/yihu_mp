import {DetailModel} from './detail-model.js'
let detail = new DetailModel

Page({
  data: {
    product: {}
  },

  onLoad: function (options) {
    let id = options.id
    detail.getDetail(id, (data) => {
      console.log(data)
      this.setData({
        product: data.data
      })
    })
  }
})