//app.js
App({
  onLaunch: function () {
    // 获取接口token信息
    wx.request({
      method: 'POST',
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=4fIgPHXoD8XPNAOALPpm5NOQ&client_secret=y9RdZHWBY8sWR1YrUAQ81TdtzefVwn7P',
      success:(res) => {
        const { data } = res
        // 更新token信息
        this.globalData.tokenMessage = {
          access_token: data.access_token,
          refresh_token: data.refresh_token
        }
      }
    })
  },
  globalData: {
    // token信息
    tokenMessage:null
  }
})