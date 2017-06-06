window.setWinHeight = function(obj) {
  setTimeout(() => {
    if (document.getElementById) {
      if (obj && !window.opera) {
        if (obj.contentDocument && obj.contentDocument.body.offsetHeight) {
          obj.height = obj.contentDocument.body.offsetHeight + 2
        } else if (obj.Document && obj.Document.body.scrollHeight) {
          obj.height = obj.Document.body.scrollHeight
        }
      }
    }
  }, 100)
}
