// pages/weibo/weibo.js
const db = wx.cloud.database();
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: null
  },
  openLocation() {
    const that = this;
    wx.chooseLocation({
      success: res => {
        // console.log(res);
        if(res.name) {
          delete res['errMsg']
          that.setData({
            location: res
          })
        }
      }
    })
  },
  onLocationTap() {
    const that = this;
    wx.getSetting({
      success: res => {
        const isLocation = res.authSetting['scope.userLocation'];
        if(isLocation) {
         that.openLocation()
        } else {
          wx.authorize({
            scope: 'scope.userLocation',
            success: res => {
              // console.log(res);
               that.openLocation()  
            }
          })
        }
      }
    })
  },
  submit(event) {
    let location = this.data.location.name;
    let content = event.detail.value.content;
    let author = app.globalData.userInfo;
    
    // wx.showLoading({
    //   title: '正在发表中···',
    // })
    wx.cloud.callFunction({
      name: 'weibo',
      data: {
        content: content,
        location: location,
        author: author
      },
      complete: res => {
        console.log('callFunction test result: ', res)
       }
      // success: res => {
      //   console.log(res);
        // const _id = res.result._id;
        // if(_id) {
        //   wx.hideLoading();
        //   wx.showToast({
        //     title: '发表成功',
        //   })
        // } else {
        //   wx.showToast({
        //     title: res.result.errMsg,
        //   })
        // }
      // }
    })
    console.log(location,content, author);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.setData({
      // type: options.type
    })
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