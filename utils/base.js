import {Config} from 'config.js';

class Base
{
  constructor(){
    "use strict";
    this.baseUrl = Config.restUrl;
  }

  // 对微信的 http 请求进行封装
  // params参数
  // 1. url [api地址]
  // 2. type [http请求方式]
  // 3. data [请求时携带的参数]
  // 4. callBack [回调函数]
  request(params){
    var that = this;
    var url = this.baseUrl + params.url;
    if(!params.type) {
      params.type = 'get';
    }
    // 发起请求
    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header: {
        'content-type' : 'application/json',
        'token': wx.getStorageSync('token')
      },
      success: function(res){
        var code = res.statusCode.toString();
        var startChar = code.charAt(0);

        if(startChar == '2') {
          params.callBack && params.callBack(res.data);
        }
      },
      fail: function(err){
        
      }
    })
  }
};

export {Base};