import { OrderModel } from '../../../model/order-model.js'
let order = new OrderModel()

Component({
  properties: {
    order: Object
  },

  data: {

  },

  methods: {
    toOrderMore(event){
      let id = event.currentTarget.dataset.id
      let type = event.currentTarget.dataset.type
      wx.navigateTo({
        url: '/pages/order-detail/order-detail?id=' + id + '&type=' + type,
      })
    },

    loaded(event) {
      var myEventDetail = {}
      var myEventOption = {}
      this.triggerEvent('loaded', myEventDetail, myEventOption)
    },

    delete(event){
      let id = event.currentTarget.dataset.id
      let that = this
      wx.showModal({
        title: '删除',
        content: '是否确认删除?',
        success(){
          order.delete(id, (res) => {
            wx.showModal({
              title: '成功',
              content: '删除成功!',
              showCancel: false,
              success(){
                that.triggerEvent('reload')
              }
            })
          })
        }
      })
    }
  }
})
