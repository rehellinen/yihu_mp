import {Base} from '../../utils/base.js';

class Index extends Base
{
  constructor(){
    super();
  }

  // 获取banner
  getBanners(cb){
    var param = {
      url : 'banner',
      callBack : function(data){
        cb && cb(data);
      }
    }
    this.request(param);
  }

  // 获取商品信息
  getGoods(cb) {
    var param = {
      url: 'goods',
      callBack: function (data) {
        cb && cb(data.data);
      }
    }
    this.request(param);
  }

  // 获取主题信息
  getTheme(cb) {
    var param = {
      url: 'theme',
      callBack: function (data) {
        cb && cb(data);
      }
    }
    this.request(param);
  }
}

export {Index}