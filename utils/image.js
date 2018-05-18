export class Image {
  constructor(that) {
    // 设置加载图标的隐藏时间
    this.loadingHiddenTime = 5000
    // 页面中图片的数量
    this.photosCount = 0
    // 已经加载出的图片数量
    this.loadedPhotos = 0
    // 保存页面的环境
    this.pageObj = that
  }

  // 用于添加页面中图片的数量
  addPhotosCount(count) {
    this.photosCount += count
  }

  // 判断图片是否全部加载
  isLoadedAll() {
    this.loadedPhotos++
    if (this.loadedPhotos == this.photosCount) {
      this.pageObj.setData({
        loadingHidden: true
      })
    }
  }

  // 加载图标的隐藏
  setLoadingHidden() {
    setTimeout(() => {
      this.pageObj.setData({
        loadingHidden: true
      })
    }, this.loadingHiddenTime)
  }
}