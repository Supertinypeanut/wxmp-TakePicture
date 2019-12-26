// pages/takePicture/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 摄像头方向
    devicePosition: "front",
    // 拍照生成的图片路径
    tempImagePath: ''
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

  },
  
  // 改变摄像头方向
  onChangeDevicePosition(){
    console.log(this.data)
    this.setData({
      devicePosition: this.data.devicePosition === "front" ? "back" : "front"
    })
  },

  // 拍照
  onTakePicture(){
    // 创建一个camera内容对象
    const ctxt = wx.createCameraContext()
    // 调用拍照
    ctxt.takePhoto({
      quality: 'high',
      success:function(res){

        // 检验是否拍照成功
        if( res.errMsg !== "operateCamera:ok"){
          return wx.showToast({
            title: '拍照失败！',
            icon: 'none'
          })
        }

        // 更新处理图片路径
        this.setData({
          tempImagePath : res.tempImagePath
        })

        console.log(88)
      }
    })


  }

})