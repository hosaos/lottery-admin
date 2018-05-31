import request from '../utils/request';
import { PAGE_SIZE } from '../utils/constant'

export default {
  getList({ pageIndex, pageSize, ticketNumber, sortOrder, sortField }) {
    const params = { pageIndex, pageSize, ticketNumber, sortOrder, sortField };
    return request('/lottery/order/relation/winningList', {
      method: 'get',
      data: params
    });
  },
}
