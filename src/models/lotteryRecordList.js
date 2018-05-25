import { message } from 'antd';
import lotteryRecordListService from '../services/lotteryRecordListService'

export default {
  namespace: 'lotteryRecordList',
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
      const pageIndex = yield select(state => state.lotteryRecordList.pageIndex);
      yield put({ type: 'get', payload: { pageIndex } });
    },
    *get({ payload: { pageIndex, lotteryName } }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          loading: true,
        },
      });
      const res = yield call(lotteryRecordListService.getList, { pageIndex, lotteryName });
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
      yield call(lotteryRecordListService.edit, pkId, values);
      yield put({ type: 'reload' });
      message.success("保存成功");
    },
    *create({ payload: { values, cb } }, { call, put }) {
      yield call(lotteryRecordListService.create, values);
      yield put({ type: 'reload' });
      message.success("保存成功");
      cb();
    },
    // *getLotteryType({ payload: { cb } }, { call }) {
    //   const { data } = yield call(lotteryRecordListService.getLotteryType);
    //   cb(data);
    // },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const payload = query || { pageIndex: 1, pageSize: 2 }
        if (pathname === '/lotteryRecords') {
          dispatch({ type: 'get', payload });
        }
      });
    },
  },
}
