import dva from 'dva'
import { browserHistory } from 'dva/router'
import { Toast } from 'antd-mobile'
import './index.html'
import './themes/index.less'
import './utils/global'

// 1. Initialize
const app = dva({
  history: browserHistory,
  onError(error) {
    Toast.fail(error.message)
  },
})

// 2. Model
app.model(require('./models/app'))

// app.model(require('./models/bbs/index'))
// app.model(require('./models/bbs/category'))
// app.model(require('./models/bbs/detail'))

// 3. Router
// app.router(require('./router'))
app.router(require('./router-dynamic'))

// 4. Start
app.start('#root')
