// pages/component/goods-list/goods-list.js
Component({  
  properties: {
    goods: Array,
  },

  data: {

  },
  
  methods: {
    toGoodsDetail(event){
      let type = event.currentTarget.dataset.type
      console.log(type)
      let id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/detail/detail?type=' + type + '&id=' + id,
      })
    }
  }
})
