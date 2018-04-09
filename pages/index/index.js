import {Index} from 'index-model.js';
var index = new Index();

Page({  
  data: {
    banner : []
  },

  onLoad: function (options) {
    this._loadData();
  },  

  // 加载所有数据
  _loadData : function(callBack) {
    // 获取Banner
    index.getBanners( (data) => {
      this.setData({
        banner : data
      })
    })

    index.getOldGoods( (data) => {
      for(let index in data){
        if(data[index].name.length > 10){          
          data[index].name = data[index].name.substr(0, 10)
          data[index].name += ' ...'
        } 
      }
      this.setData({
        oldGoods: data
      })
    })

    index.getTheme( (data) => {
      this.setData({
        theme: data
      })
    })
  },

  detailTap(event){
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
  },

  toTheme(event){
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../theme/theme?id=' + id,
    })
  }
})