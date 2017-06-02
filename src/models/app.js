export default {
  namespace: 'app',
  state: {
    type: 'slide',
  },
  subscriptions: {
    // setup({ dispatch, history }) {
    // },
  },
  effects: {

  },
  reducers: {
    pageTransition(state, action) {
      const { type } = action.payload
      return { ...state, type }
    },
  },
}
