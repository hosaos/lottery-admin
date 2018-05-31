import { message } from 'antd';
import withDrawListService from '../services/withDrawListService'

export default {
  namespace: 'withDrawList',
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
      const pageIndex = yield select(state => state.withDrawList.pageIndex);
      yield put({ type: 'get', payload: { pageIndex } });
    },
    *get({ payload: { pageIndex, userName } }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          loading: true,
        },
      });
      const res = yield call(withDrawListService.getList, { pageIndex, userName });
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
    *edit({ payload: { pkId, values } }, { call, put }) {
      yield call(withDrawListService.edit, pkId, values);
      yield put({ type: 'reload' });
      message.success("保存成功");
    },
    *create({ payload: { values, cb } }, { call, put }) {
      yield call(withDrawListService.create, values);
      yield put({ type: 'reload' });
      message.success("保存成功");
      cb();
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const payload = query || { pageIndex: 1, pageSize: 15 }
        if (pathname === '/withDraws') {
          dispatch({ type: 'get', payload });
        }
      });
    },
  },
}
