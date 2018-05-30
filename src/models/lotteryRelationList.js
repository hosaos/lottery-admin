import { message } from 'antd';
import lotteryRelationListService from '../services/lotteryRelationListService'

export default {
  namespace: 'lotteryRelationList',
  state: {
    list: [],
    total: null,
    pageIndex: null,
    loading: false,
    currentItem: {}
  },
  reducers: {
    save(state, { payload: { data: list, total, pageIndex, loading, currentItem } }) {
      return { ...state, list, total, pageIndex, loading, currentItem };
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
      const pageIndex = yield select(state => state.lotteryRelationList.pageIndex);
      yield put({ type: 'get', payload: { pageIndex } });
    },
    *get({ payload: { pageIndex, lotteryRelationName } }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          loading: true,
        },
      });
      const res = yield call(lotteryRelationListService.getList,
        { pageIndex, lotteryRelationName });
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
      yield call(lotteryRelationListService.edit, pkId, values);
      yield put({ type: 'reload' });
      message.success("保存成功");
    },
    *create({ payload: { values, cb } }, { call, put }) {
      yield call(lotteryRelationListService.create, values);
      yield put({ type: 'reload' });
      message.success("保存成功");
      cb();
    },
    *setCurrentItem({ payload: record }, { select, put }) {
      const list = yield select(state => state.lotteryRelationList.list);
      const total = yield select(state => state.lotteryRelationList.total);
      const pageIndex = yield select(state => state.lotteryRelationList.pageIndex);
      yield put({
        type: 'save',
        payload: {
          currentItem: record,
          data: list,
          total,
          pageIndex,
          loading: false,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const payload = query || { pageIndex: 1, pageSize: 10 }
        if (pathname === '/lotteryRelations') {
          dispatch({ type: 'get', payload });
        }
      });
    },
  },
}
