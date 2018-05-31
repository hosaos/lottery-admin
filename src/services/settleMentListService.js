import request from '../utils/request';
import { PAGE_SIZE } from '../utils/constant'

export default {
  getList({ pageIndex, pageSize, ticketNumber }) {
    const params = { pageIndex, pageSize, ticketNumber };
    return request('/lottery/order/relation/list', {
      method: 'get',
      data: params
    });
  },
}
