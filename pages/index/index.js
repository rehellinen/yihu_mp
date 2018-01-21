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
  _loadData : function(callBack)
  {
    var that = this;

    // 获取Banner
    index.getBanners( (data) => {
      this.setData({
        banner : data
      })
    })
  }
})