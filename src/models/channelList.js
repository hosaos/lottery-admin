import { message } from 'antd';
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
      const pageIndex = yield select(state => state.channelList.pageIndex);
      yield put({ type: 'get', payload: { pageIndex } });
    },
    *get({ payload: { pageIndex, channelName } }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          loading: true,
        },
      });
      const res = yield call(channelListService.getList, { pageIndex, channelName });
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
      debugger;
      yield call(channelListService.edit, pkId, values);
      yield put({ type: 'reload' });
      message.success("保存成功");
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const payload = query || { pageIndex: 1, pageSize: 2 }
        if (pathname === '/channels') {
          dispatch({ type: 'get', payload });
        }
      });
    },
  },
}
