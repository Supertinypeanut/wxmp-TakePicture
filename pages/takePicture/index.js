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
    faceInfo: null,
    // 映射关系
    map: {
      gender: {
        male: '男性',
        female: '女性'
      },
      expression: {
        none: '不笑',
        smile: '微笑',
        laugh: '大笑'
      },
      glasses: {
        none: '无眼镜',
        common: '普通眼镜',
        sun: '墨镜'
      },
      emotion: {
        angry: '愤怒',
        disgust: '厌恶',
        fear: '恐惧',
        happy: '高兴',
        sad: '伤心',
        surprise: '惊讶',
        neutral: '无表情',
        pouty: '撅嘴',
        grimace: '鬼脸'
      }
    }
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

  // 选取本地图片
  onChooseImage(){
    wx.chooseImage({
      // 可选择图片数量
      count: 1,
      // 选择原图
      sizeType: ['original'],
      // 图片的来源
      sourceType: ['album'],
      success: (res) => {
        // 设置展示图片路径
        this.setData({
          tempImagePath: res.tempFilePaths[0]
        },() =>{
          // 调用检测人脸信息函数
          this.getFaceInfo()
        })
      }
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
        // 检验是否获取到人脸
        if (res.data.result === null){
          // 清除当前检测图片
          this.setData({
            tempImagePath:''
          },()=>{
            // 提示用户
            wx.showToast({
              title: '未检测到人脸',
              icon: 'none'
            })
          })
          return 
        }
      
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