import { Base } from '../../utils/base.js';

class DetailModel extends Base{
  constructor() {
    super()
  }

  getDetail(id, cb){
    let params = {
      url: 'goods/' + id,
      callBack: function (data) {
        cb && cb(data);
      }
    }
    this.request(params)
  }
}

export { DetailModel }
