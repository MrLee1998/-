// pages/me/me.js
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: wx.getStorageSync('userInfo') || {}
  },
  onGetUserInfo(e) {
    let userInfo = e.detail.userInfo
    wx.cloud.callFunction({
      name: 'getOpneId'
    }).then(res => {
      userInfo.openid = res.result.openid
      this.setData({
        userInfo: userInfo
      })
    })
    // 调用云函数 获取用户id
    // console.log(userInfo);
    wx.setStorageSync('userInfo', userInfo)
    this.setData({
      userInfo
    })
  },
  scanCode() {
    this.addBook()
    wx.scanCode({
      success: res => {
        //  图书编码
        console.log(res.result);
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  addBook() {
    wx.cloud.callFunction({
      name: 'getDouban',
      data: {
        isbn: '9787115385734'
      },
      success: res => {
        console.log(res);
        db.collection('doubanbooks').add({
          data: res.result
        }).then(res1 => {
          if(res1._id) {
            wx.showModal({
              title: '添加成功',
              content: `《${res.result.title}》 添加成功`
            })
          }
          console.log(res1);
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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