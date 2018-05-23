import channelListService from '../services/channelListService'

export default {
  namespace: 'channelList',
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
  },
  effects: {
    *get({ payload: { pageIndex, pageSize } }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          loading: true,
        },
      });
      const res = yield call(channelListService.getList, { pageIndex, pageSize });
      yield put({
        type: 'save',
        payload: {
          data: res.rows,
          total: res.records,
          pageIndex,
          loading: false
        },
      });
    }
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     return history.listen(({ pathname, query }) => {
  //       if (pathname === '/channels') {
  //         debugger;
  //         dispatch({ type: 'get', payload: query });
  //       }
  //     });
  //   },
  //
  // },
}
