// pages/component/goods-list/goods-list.js
Component({  
  properties: {
    goods: Array,
    kind: {
      type: String,
      value: 'goods'
    }
  },

  data: {

  },
  
  methods: {
    toGoodsDetail(event){
      let kind = event.currentTarget.dataset.kind
      let id = event.currentTarget.dataset.id
      if(kind === 'goods'){
        wx.navigateTo({
          url: '/pages/detail/detail?kind=goods&id='+id,
        })
      }else{
        wx.navigateTo({
          url: '/pages/detail/detail?kind=oldGoods&id=' + id,
        })
      }
    }
  }
})
