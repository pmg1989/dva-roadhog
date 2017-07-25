import { isIOS, isAndroid } from './tools'

function mockCallApp(str, params) {
  console.log(`invoking app - ${str}`, params)
}

if(!window.android) {
  window.android = {
    returnback: function (params) { mockCallApp('returnback', params) },
    openUser: function (params) { mockCallApp('openUser', params) },
    hideAddress: function (params) { mockCallApp('hideAddress', params) },
    showAlert: function (params) { mockCallApp('showAlert', params) },
    refreshPage: function (params) { mockCallApp('refreshPage', params) },
    showMenu: function (params) { mockCallApp('showMenu', params) },
    hideMenu: function (params) { mockCallApp('hideMenu', params) },
    share: function (params) { mockCallApp('share', params) },
    contentHeight: function (params) { mockCallApp('contentHeight', params) },
    getLocation: function (params) { mockCallApp('getLocation', params); setlocationFromApp(0, 0) },
    loginAgain: function (params) { mockCallApp('loginAgain', params) },
    getAndroidCloseAppBottom: function(params) { mockCallApp('getAndroidCloseAppBottom', params) },
  }
}

if(!window.webkit) {
  window.webkit = {
    messageHandlers: {
      returnback: { postMessage: function (params) { mockCallApp('returnback', params) } },
      openUser: { postMessage: function (params) { mockCallApp('openUser', params) } },
      hideAddress: { postMessage: function (params) { mockCallApp('hideAddress', params) } },
      showAlert: { postMessage: function (params) { mockCallApp('showAlert', params) } },
      refreshPage: { postMessage: function (params) { mockCallApp('refreshPage', params) } },
      showMenu: { postMessage: function (params) { mockCallApp('showMenu', params) } },
      hideMenu: { postMessage: function (params) { mockCallApp('hideMenu', params) } },
      share: { postMessage: function (params) { mockCallApp('share', params) } },
      contentHeight: { postMessage: function (params) { mockCallApp('contentHeight', params) } },
      getLocation: { postMessage: function (params) { mockCallApp('getLocation', params); setlocationFromApp(0, 0) } },
      loginAgain: { postMessage: function (params) { mockCallApp('loginAgain', params) } },
      close: { postMessage: function (params) { mockCallApp('close', params) } },
    }
  }
}

const tools = {
  returnback(params) {
    if (isAndroid) {
      window.android.returnback(params)
    } else if (isIOS) {
      window.webkit.messageHandlers.returnback.postMessage(params)
    }
  },
  openUser(params) {
    if (isAndroid) {
      window.android.openUser(params)
    } else if (isIOS) {
      window.webkit.messageHandlers.openUser.postMessage(params)
    }
  },
  hideAddress(params) {
    if (isAndroid) {
      window.android.hideAddress(JSON.stringify(params))
    } else if (isIOS) {
      window.webkit.messageHandlers.hideAddress.postMessage(params)
    }
  },
  showAlert(params) {
    if (isAndroid) {
      alert(params)
    } else if (isIOS) {
      window.webkit.messageHandlers.showAlert.postMessage(params)
    }
  },
  refreshPage(params) {
    if (isAndroid) {
      window.android.refreshPage(JSON.stringify(params))
    } else if (isIOS) {
      window.webkit.messageHandlers.refreshPage.postMessage(params)
    }
  },
  showMenu(params) {
    if (isAndroid) {
      window.android.showMenu(JSON.stringify(params))
    } else if (isIOS) {
      window.webkit.messageHandlers.showMenu.postMessage(params)
    }
  },
  hideMenu(params) {
    if (isAndroid) {
      window.android.hideMenu(JSON.stringify(params))
    } else if (isIOS) {
      window.webkit.messageHandlers.hideMenu.postMessage(params)
    }
  },
  share(params) {
    if (isAndroid) {
      window.android.share(JSON.stringify(params))
    } else if (isIOS) {
      window.webkit.messageHandlers.share.postMessage(params)
    }
  },
  contentHeight(params) {
    if (isAndroid) {
      window.android.contentHeight(JSON.stringify(params))
    } else if (isIOS) {
      window.webkit.messageHandlers.contentHeight.postMessage(params)
    }
  },
  getLocation(params) {
    if (isAndroid) {
      window.android.getLocation()
    } else if (isIOS) {
      window.webkit.messageHandlers.getLocation.postMessage(params)
    }
  },
  loginAgain(params) {
    if (isAndroid) {
      window.android.LoginAgain()
    } else if (isIOS) {
      window.webkit.messageHandlers.loginAgain.postMessage()
    }
  },
  closeAppBottom(params) {
    if(isAndroid) {
      window.android.getAndroidCloseAppBottom(JSON.stringify(params))
    } else if(isIOS) {
      window.webkit.messageHandlers.close.postMessage(params)
    }
  }
}

export default tools
