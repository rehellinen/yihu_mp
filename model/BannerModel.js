/**
 *
 *  Create By rehellinen
 *  Create On 2018/5/18 15:45
 */
import {BaseModel} from "./BaseModel"

export class BannerModel extends BaseModel{
    constructor(){
        super()
    }

    // 获取banner
    getBanners(cb){
        let param = {
            url : 'banner',
            callBack(res){
                cb && cb(res);
            }
        }
        this.request(param);
    }
}