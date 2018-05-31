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
}
