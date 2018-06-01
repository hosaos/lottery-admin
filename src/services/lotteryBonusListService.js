import request from '../utils/request';
import { PAGE_SIZE } from '../utils/constant'

export default {
  getList({ lotteryTypeId }) {
    const params = { lotteryTypeId };
    return request('/lottery/bonus/list', {
      method: 'get',
      data: params
    });
  },
}
