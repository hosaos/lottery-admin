import settleMentListService from '../services/settleMentListService'

export default {
  namespace: 'settleMentList',
  state: {
    list: [],
    total: null,
    pageIndex: null,
    loading: false,
  },
  reducers: {
    save(state, { payload: { data: list, total, pageIndex, loading } }) {
      return { ...state, list, total, pageIndex, loading };
    },
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },
    hideModal(state) {
      return { ...state, modalVisible: false }
    },
  },
  effects: {
    *reload(action, { put, select }) {
      debugger;
      const pageIndex = yield select(state => state.settleMentList.pageIndex);
      yield put({ type: 'get', payload: { pageIndex } });
    },
    *get({ payload: { pageIndex, ticketNumber } }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          loading: true,
        },
      });
      const res = yield call(settleMentListService.getList, { pageIndex, ticketNumber });
      yield put({
        type: 'save',
        payload: {
          data: res.rows,
          total: res.records,
          pageIndex,
          loading: false
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const payload = query || { pageIndex: 1, pageSize: 15 }
        if (pathname === '/settleMents') {
          dispatch({ type: 'get', payload });
        }
      });
    },
  },
}
