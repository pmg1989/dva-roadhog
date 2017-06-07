window.setWinHeight = function(obj) {
  if (document.getElementById) {
    if (obj && !window.opera) {
      if (obj.contentDocument && obj.contentDocument.body.offsetHeight) {
        obj.height = obj.contentDocument.body.offsetHeight + 2
      } else if (obj.Document && obj.Document.body.scrollHeight) {
        obj.height = obj.Document.body.scrollHeight
      }
    }
  }
}

window.iFrameHeight = function(id) {
  const ifm = document.getElementById(id)
  const subWeb = document.frames ? document.frames[id].document : ifm.contentDocument
  if(ifm != null && subWeb != null) {
    ifm.height = subWeb.body.clientHeight + 5
  }
}
