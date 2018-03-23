import {DetailModel} from './detail-model.js'
let detail = new DetailModel

Page({
  data: {
    product: {},
    selectedCount: 1,
    currentTabsIndex: 0,
    countArray:[1, 2, 3, 4, 5, 6]
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
  },

  pickerchange(event){
    let index = event.detail.value
    this.setData({
      selectedCount: this.data.countArray[index]
    })
  }
})