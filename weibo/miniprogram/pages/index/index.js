// pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSize: '',
    publishData: [],
    imageNum: '',
    isActive: false,
    praiseUser: [],
    mask: false,
    commentData: []
  },
  comment(event) {
    this.setData({
      isActive: !this.data.isActive
    })
  },
  onPraise(event) {
    const that = this
    const publishDataIndex = event.currentTarget.dataset.praise
    const praiseObj = that.data.publishData[publishDataIndex]
    let praiseUser = praiseObj.author.openid
    let pariseId = praiseObj._id
    wx.cloud.callFunction({
      name: 'praise',
      data: {
        pariseId: pariseId,
        praiseUser: praiseUser
      },
      success: res => {
        console.log(res);
      }
    })
  },
  onImageTap(event){
    console.log(event);
    const that = this
    const pub = event.target.dataset.pub
    const img = event.target.dataset.img
    let imageUrl = that.data.publishData[pub].chooseImages
    let current = that.data.publishData[pub].chooseImages[img]
    wx.previewImage({
      urls: imageUrl,
      current: current
    })
  },
  inintImageSize() {
    let windowWidth = wx.getSystemInfoSync().windowWidth;
    let weiboWidth = windowWidth - 40;
    let imageSize = weiboWidth ;
    // console.log(imageSize);
    this.setData({
      imageSize: imageSize,  
    })
  },
  onWriteWeibo(e) {
    console.log(e);
    if(app.isLogin) {
      console.log('跳转');
      wx.showActionSheet({
        itemList: ['图片', '视频'],
        success: res => {
          console.log(res);
          const tapIndex = res.tapIndex
          wx.navigateTo({
            url: '../weibo/weibo?type=' + tapIndex
          })
        }
      })
    
    } else {
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },
  getPublishData(event) {
    const that = this
    wx.showNavigationBarLoading()
    wx.cloud.callFunction({
      name: 'getPublishData',
      data: {},
      success(res) {
        console.log(res.result.data);    
        that.setData({
          publishData: res.result.data
        })  
      },
      fail(err) {
        console.log(err)
      },
      complete() {
        wx.hideNavigationBarLoading()
      }
    })
  },
  onFocus(event) {
    this.setData({
      mask: true
    })
  },
  onBlur(event) {
    this.setData({
      mask: false
    })
  },
  onConfirm(event){
    const content = event.detail.value 
    console.log(event);
    const that = this
    const publishDataIndex = event.currentTarget.dataset.comment
    const praiseObj = that.data.publishData[publishDataIndex]
    let commentUser = praiseObj.author.nickName
    let pariseId = praiseObj._id
    let commentData = praiseObj.comment
    console.log(content, pariseId, commentUser);
    wx.cloud.callFunction({
      name: 'comment',
      data: {
        content: content,
        pariseId: pariseId,
        commentUser: commentUser
      },
      success: res => {
        console.log(res);
        this.setData({
          commentData: commentData
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.inintImageSize()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getPublishData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})