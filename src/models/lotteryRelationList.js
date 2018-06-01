import { message } from 'antd';
import lotteryRelationListService from '../services/lotteryRelationListService'
import lotteryBonusListService from '../services/lotteryBonusListService'

export default {
  namespace: 'lotteryRelationList',
  state: {
    list: [],
    total: null,
    pageIndex: null,
    loading: false,
    currentItem: {},
    windowList: [],
    bonusList: [],
    buttonDisabled: true,
    lotteryWindowId: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, pageIndex, loading, currentItem, windowList, bonusList } }) {
      return { ...state, list, total, pageIndex, loading, currentItem, windowList, bonusList };
    },
    clearCurrentItem(state) {
      return { ...state, currentItem: {}, bonusList: [] }
    },
    saveCurrentItem(state, { payload: { currentItem, bonusList } }) {
      return { ...state, currentItem, bonusList }
    },
    enableButton(state, { payload }) {
      return { ...state, ...payload, buttonDisabled: false }
    },
    disableButton(state) {
      return { ...state, buttonDisabled: true }
    },
    setCurrentWindow(state, { payload: { lotteryWindowId } }) {
      return { ...state, lotteryWindowId }
    },
  },
  effects: {
    *reload(action, { put, select }) {
      // const pageIndex = yield select(state => state.lotteryRelationList.pageIndex);
      const lotteryWindowId = yield select(state => state.lotteryRelationList.lotteryWindowId);
      yield put({ type: 'get', payload: { pageIndex: 1, lotteryWindowId } });
    },
    *get({ payload: { pageIndex, pageSize, lotteryWindowId } }, { call, put, select }) {
      if (!lotteryWindowId) {
        message.error("请先选择窗口");
        return;
      }
      const currentItem = yield select(state => state.lotteryRelationList.currentItem);
      const windowList = yield select(state => state.lotteryRelationList.windowList);
      const bonusList = yield select(state => state.lotteryRelationList.bonusList);
      const res = yield call(lotteryRelationListService.getList,
        { pageIndex: 1, pageSize, lotteryWindowId });
      yield put({
        type: 'save',
        payload: {
          data: res.rows,
          total: res.records,
          pageIndex: 1,
          loading: false,
          currentItem,
          windowList,
          bonusList,
        },
      });
    },
    *checkLottery({ payload }, { call, put, select }) {
      const currentItem = yield select(state => state.lotteryRelationList.currentItem);
      if (!currentItem || !currentItem.bonusId) {
        message.error("请选择彩票中奖金额");
        return;
      }
      yield call(lotteryRelationListService.checkLottery, { id: currentItem.id, bonusId: currentItem.bonusId });
      message.success(`票号:${currentItem.ticketNumber},兑奖操作成功`);
      yield put({ type: 'reload' });
      yield put({ type: 'clearCurrentItem' });
      yield put({ type: 'disableButton' });
    },
    *setWindowList({ payload: { windowList } }, { put }) {
      yield put({
        type: 'save',
        payload: {
          windowList,
          bonusList: []
        },
      });
    },
    *setCurrentItem({ payload: record }, { select, put, call }) {
      const bonusList = yield call(lotteryBonusListService.getList, { lotteryTypeId: record.lotteryTypeId });
      yield put({ type: 'saveCurrentItem', payload: { currentItem: record, bonusList } });
    },

    *setBonus({ payload: { bonusId } }, { select, put, call }) {
      const currentItem = yield select(state => state.lotteryRelationList.currentItem);
      const bonusList = yield select(state => state.lotteryRelationList.bonusList);
      currentItem.bonusId = bonusId;
      yield put({ type: 'saveCurrentItem', payload: { currentItem, bonusList } });
      yield put({ type: 'enableButton' });
    },
  },
}
