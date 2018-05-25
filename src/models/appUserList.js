import { message } from 'antd';
import appUserListService from '../services/appUserListService'

export default {
  namespace: 'appUserList',
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
      const pageIndex = yield select(state => state.appUserList.pageIndex);
      yield put({ type: 'get', payload: { pageIndex } });
    },
    *get({ payload: { pageIndex, mobile } }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          loading: true,
        },
      });
      const res = yield call(appUserListService.getList, { pageIndex, mobile });
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
        const payload = query || { pageIndex: 1, pageSize: 2 }
        if (pathname === '/appUsers') {
          dispatch({ type: 'get', payload });
        }
      });
    },
  },
}
