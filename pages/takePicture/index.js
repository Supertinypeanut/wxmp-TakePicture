// pages/takePicture/index.js

// 在页面中，可以调用 getApp() 函数，获取到全局的一些数据
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 摄像头方向
    devicePosition: "front",
    // 拍照生成的图片路径
    tempImagePath: '',
    // 图片检测信息
    faceInfo: null
  },
  
  // 改变摄像头方向
  onChangeDevicePosition(){
    console.log(this.data)
    this.setData({
      devicePosition: this.data.devicePosition === "front" ? "back" : "front"
    })
  },

  // 清除src
  onClearSrc(){
    this.setData({
      tempImagePath: ''
    })
  },

  // 拍照
  onTakePicture(){
    // 创建一个camera内容对象
    const ctxt = wx.createCameraContext()
    // 调用拍照
    ctxt.takePhoto({
      quality: 'high',
      success:(res) => {

        // 检验是否拍照成功
        if( res.errMsg !== "operateCamera:ok"){
          return wx.showToast({
            title: '拍照失败！',
            icon: 'none'
          })
        }

        // 更新图片路径
        this.setData({
          // 存储图片路径
          tempImagePath : res.tempImagePath
        },() => {
          // 调用检测人脸信息函数
          this.getFaceInfo()
        })
      }
    })
  },

  // 获取图片检测信息
  getFaceInfo(){
    wx.showLoading({
      title: '颜值检测中...'
    })

    // 获取全局token
    const token = app.globalData.tokenMessage.access_token

    // 获取base64的图片
    const fileManager = wx.getFileSystemManager()
    const base64Img = fileManager.readFileSync(this.data.tempImagePath, 'base64')

    // 调用百度API检测图片
    wx.request({
      method: 'POST',
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token='+ token,
      header:{
        'Content-Type': 'application/json'
      },
      data:{
        image_type:'BASE64',
        image: base64Img,
        face_field: 'age,gender,beauty,expression,glasses,emotion'
      },
      success:(res) => {
        // 更新图片检测信息
        this.setData({
          faceInfo: res.data.result.face_list[0]
        })
      },
      complete:function(){
        // 关闭loading
        wx.hideLoading()
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

  },

})