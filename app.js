//app.js
App({
  onLaunch: function () {
    console.log(this.globalData.userInfo)
  },
  globalData: {
    userInfo: null
  }
})