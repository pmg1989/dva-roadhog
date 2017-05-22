import dva from 'dva'
import { browserHistory } from 'dva/router'
import { Toast } from 'antd-mobile'
import './index.css'

// 1. Initialize
const app = dva({
  history: browserHistory,
  onError(error) {
    Toast.fail(error.message)
  },
})

// 2. Model
app.model(require('./models/example'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
