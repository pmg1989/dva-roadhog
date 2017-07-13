import { isIOS, isAndroid } from './tools'

const tools = {
  returnback(params = null) {
    if (isAndroid) {
      window.android.returnback(JSON.stringify(params))
    } else if (isIOS) {
      window.webkit.messageHandlers.returnback.postMessage(params)
    }
  },
  openUser(params = null) {
    if (isAndroid) {
      window.android.openUser(JSON.stringify(params))
    } else if (isIOS) {
      window.webkit.messageHandlers.openUser.postMessage(params)
    }
  },
  hideAddress(params = null) {
    if (isAndroid) {
      window.android.hideAddress(JSON.stringify(params))
    } else if (isIOS) {
      window.webkit.messageHandlers.hideAddress.postMessage(params)
    }
  },
  showAlert(params = null) {
    if (isAndroid) {
      alert(params)
    } else if (isIOS) {
      window.webkit.messageHandlers.showAlert.postMessage(params)
    }
  },
  refreshPage(params = null) {
    if (isAndroid) {
      window.android.refreshPage(JSON.stringify(params))
    } else if (isIOS) {
      window.webkit.messageHandlers.refreshPage.postMessage(params)
    }
  },
  showMenu(params = null) {
    if (isAndroid) {
      window.android.showMenu(JSON.stringify(params))
    } else if (isIOS) {
      window.webkit.messageHandlers.showMenu.postMessage(params)
    }
  },
  hideMenu(params = null) {
    if (isAndroid) {
      window.android.hideMenu(JSON.stringify(params))
    } else if (isIOS) {
      window.webkit.messageHandlers.hideMenu.postMessage(null)
    }
  },
  share(params = null) {
    if (isAndroid) {
      window.android.share(JSON.stringify(params))
    } else if (isIOS) {
      window.webkit.messageHandlers.share.postMessage(params)
    }
  },
  contentHeight(params = null) {
    if (isAndroid) {
      window.android.contentHeight(JSON.stringify(params))
    } else if (isIOS) {
      window.webkit.messageHandlers.contentHeight.postMessage(params)
    }
  },
  getLocation(params = null) {
    if (isAndroid) {
      window.android.getLocation()
    } else if (isIOS) {
      window.webkit.messageHandlers.getLocation.postMessage(params)
    }
  },
  _LoginAgain(params = null) {
    if (isAndroid) {
      if (params.status === '401' || params.status === '403') {
        window.android.LoginAgain()
      }
    } else if (isIOS) {
      if (params.status === '401' || params.status === '403') {
        window.webkit.messageHandlers.loginAgain.postMessage(null)
      }
    }
  },
}

export default tools
