import { message } from 'antd';
import webUserListService from '../services/webUserListService'

export default {
  namespace: 'webUserList',
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
      const pageIndex = yield select(state => state.webUserList.pageIndex);
      yield put({ type: 'get', payload: { pageIndex } });
    },
    *get({ payload: { pageIndex, fullName } }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          loading: true,
        },
      });
      const res = yield call(webUserListService.getList, { pageIndex, fullName });
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
    *edit({ payload: { id, values } }, { call, put }) {
      yield call(webUserListService.edit, values);
      yield put({ type: 'reload' });
      message.success("保存成功");
    },
    *create({ payload: { values, cb } }, { call, put }) {
      yield call(webUserListService.create, values);
      yield put({ type: 'reload' });
      message.success("保存成功");
      cb();
    },

    *resetPassword({ payload: { values } }, { call, put }) {
      console.log(values);
      yield call(webUserListService.resetPassword, values);
      // yield put({ type: 'reload' });
      message.success("操作成功");
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const payload = query || { pageIndex: 1, pageSize: 15 }
        if (pathname === '/webUsers') {
          dispatch({ type: 'get', payload });
        }
      });
    },
  },
}
