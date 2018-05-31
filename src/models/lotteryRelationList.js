import { message } from 'antd';
import lotteryRelationListService from '../services/lotteryRelationListService'

export default {
  namespace: 'lotteryRelationList',
  state: {
    list: [],
    total: null,
    pageIndex: null,
    loading: false,
    currentItem: {},
    windowList: [],
  },
  reducers: {
    save(state, { payload: { data: list, total, pageIndex, loading, currentItem, windowList } }) {
      return { ...state, list, total, pageIndex, loading, currentItem, windowList };
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
    *get({ payload: { pageIndex, pageSize, lotteryWindowId } }, { call, put, select }) {
      const currentItem = yield select(state => state.lotteryRelationList.currentItem);
      const windowList = yield select(state => state.lotteryRelationList.windowList);
      const res = yield call(lotteryRelationListService.getList,
        { pageIndex, pageSize, lotteryWindowId });
      yield put({
        type: 'save',
        payload: {
          data: res.rows,
          total: res.records,
          pageIndex,
          loading: false,
          currentItem,
          windowList,
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
      const windowList = yield select(state => state.lotteryRelationList.windowList);
      yield put({
        type: 'save',
        payload: {
          currentItem: record,
          data: list,
          total,
          pageIndex,
          loading: false,
          windowList,
        },
      });
    },
    *setWindowList({ payload: { windowList } }, { put }) {
      yield put({
        type: 'save',
        payload: {
          windowList,
        },
      });
    },
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     return history.listen(({ pathname, query }) => {
  //       const payload = query || { pageIndex: 1, pageSize: 10 }
  //       if (pathname === '/lotteryRelations') {
  //         dispatch({ type: 'get', payload });
  //       }
  //     });
  //   },
  // },
}
