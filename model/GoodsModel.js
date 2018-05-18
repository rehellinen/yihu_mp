import {BaseModel} from './BaseModel.js'

export class GoodsModel extends BaseModel {
    constructor() {
        super()
    }

    // 更新购物车中商品信息
    updateGoods(cb) {
        let goods = this.getCartDataFromLocal()
        let ids = []
        let idsStr = ''

        if (goods.length === 0) {
            cb && cb()
            return
        }

        for (let item of goods) {
            ids.push(item.id)
        }
        idsStr = ids.join('|')

        let params = {
            url: 'goods/check',
            data: {
                ids: idsStr
            },
            callBack: (res) => {
                this._updateStorageGoods(res, goods)
                cb && cb()
            },
            eCallBack: (res) => {
                cb && cb()
            }
        }
        this.request(params)
    }


    // 获取首页旧物漂流
    getIndexOldGoods(cb) {
        let params = {
            url: 'oldGoods/index',
            callBack(res) {
                cb && cb(res)
            },
        }
        this.request(params)
    }

    // 获取首页发现鲜货
    getIndexNewGoods(cb) {
        let params = {
            url: 'newGoods/index',
            callBack(res) {
                cb && cb(res)
            },
        }
        this.request(params)
    }

    // 获取所有二手 / 自营商品
    getGoods(url, page, cb, ecb) {
        let params = {
            url: url,
            data: {
                page: page,
                size: 14
            },
            callBack(res) {
                cb && cb(res)
            },
            eCallBack(res) {
                ecb && ecb(res)
            }
        }
        this.request(params)
    }

    // 获取自营 / 二手商品详情
    getGoodsDetail(url, cb) {
        let params = {
            url: url,
            callBack: function (data) {
                cb && cb(data)
            }
        }
        this.request(params)
    }

    // 根据商家id获取所有商品
    getGoodsByShopId(page, id, cb, ecb) {
        let params = {
            url: 'newGoods/shop/' + id,
            data: {
                page: page,
                size: 10
            },
            callBack: function (data) {
                cb && cb(data)
            },
            eCallBack(data) {
                ecb && ecb(data)
            }
        }

        this.request(params)
    }

    // 获取自营商店最近新品
    getRecentGoodsByShopId(id, cb) {
        let params = {
            url: 'newGoods/recent/shop/' + id,
            callBack: function (data) {
                cb && cb(data)
            }
        }

        this.request(params)
    }

    // 根据分类获取商品
    getGoodsByCategoryID(page, id, cb, ecb) {
        let params = {
            url: 'goods/category/' + id,
            data: {
                page: page,
                size: 12
            },
            callBack(res) {
                cb && cb(res)
            },
            eCallBack(res) {
                ecb && ecb(res)
            }
        }
        this.request(params)
    }

    // 获取商店页面三个商品图片
    getRecommend(id, cb) {
        let params = {
            url: 'newGoods/recommend/shop/' + id,
            callBack(res) {
                cb && cb(res)
            }
        }
        this.request(params)
    }
}
