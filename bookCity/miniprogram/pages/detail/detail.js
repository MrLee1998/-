
// pages/detail/detail.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookInfo: {},
    id: '',
    textarea: '',
    showBox: false
  },
  showBox() {
    this.setData({
      showBox: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  init() {
    wx.showLoading()
    db.collection('doubanbooks').doc(this.data.id).get({
      success: ((res) => {
        // console.log(res.data)
        this.setData({
          bookInfo: res.data
        })
        // console.log(this.data.bookInfo);
        wx.hideLoading()
     })
    })
  },
  onLoad: function (options) {
    console.log(options);
    let id = options.id
    this.setData({
      id: id
    })
    db.collection('doubanbooks').doc(this.data.id).update({
      data: {
        count: db.command.inc(1)
      }
    })
    this.init()
  },
  bindFormSubmit(e) {
    console.log(e.detail.value.textarea);
    let newComment = e.detail.value.textarea
    let { nickName } = wx.getStorageSync('userInfo')
    let time = new Date()
    let day = time.getDay()
    let month = (time.getMonth() + 1) > 9 ? (time.getMonth() + 1) : `0${(time.getMonth() + 1)}`
    let year = time.getFullYear()
    let date = `${year}-${month}-${day}`
    db.collection('doubanbooks').doc(this.data.id).update({
      data: {
        comments: _.push({
          author: nickName,
          content: newComment,
          date: date
        })
      }
    }).then(res => {
      if(res) {
        wx.showModal({
          title: '评论成功'
        })
        this.setData({
          textarea: '',
          showBox: false
        })
        this.init()
      }
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