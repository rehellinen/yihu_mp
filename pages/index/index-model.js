import {Base} from '../../utils/base.js';

class Index extends Base
{
  constructor(){
    super();
  }

  // 获取banner
  getBanners(callBack){
    var that = this;
    var param = {
      url : 'banner',
      callBack : function(data){
        data = data.data;
        callBack && callBack(data);
      }
    }
    this.request(param);
  }

  // 获取商品信息
  getGoods(callBack) {
    var that = this;
    var param = {
      url: 'goods',
      callBack: function (data) {
        data = data.data;
        callBack && callBack(data);
      }
    }
    this.request(param);
  }
}

export {Index}