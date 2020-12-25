// pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSize: '',
    publishData: [],
    imageNum: ''
  },
  inintImageSize() {
    let windowWidth = wx.getSystemInfoSync().windowWidth;
    let weiboWidth = windowWidth - 40;
    let imageSize = weiboWidth ;
    console.log(imageSize);
    this.setData({
      imageSize: imageSize,  
    })
  },
  onWriteWeibo(e) {
    console.log(e);
    if(app.isLogin) {
      console.log('跳转');
      wx.showActionSheet({
        itemList: ['文字', '视频'],
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
          publishData: res.result.data,
          
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPublishData()
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