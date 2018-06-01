import request from '../utils/request';
import { PAGE_SIZE } from '../utils/constant'

export default {
  getList({ pageIndex, pageSize, lotteryWindowId }) {
    const params = { pageIndex, pageSize, lotteryWindowId };
    return request('/lottery/order/relation/list', {
      method: 'get',
      data: params
    });
  },

  checkLottery({ id, bonusId }) {
    const params = { id, bonusId };
    return request('/lottery/order/relation/checkLottery', {
      method: 'POST',
      data: params,
    });
  },
}
