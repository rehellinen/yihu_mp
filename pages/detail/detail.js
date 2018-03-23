import {DetailModel} from './detail-model.js'
let detail = new DetailModel

Page({
  data: {
    product: {},
    selectedCount: 100,
    currentTabsIndex: 0
  },

  onLoad: function (options) {
    let id = options.id
    detail.getDetail(id, (data) => {
      this.setData({
        product: data
      })
    })
  },

  onTabsItemTap(event){
    let index = event.currentTarget.dataset.index
    this.setData({
      currentTabsIndex: index
    })
  }
})