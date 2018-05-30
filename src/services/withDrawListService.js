import request from '../utils/request';
import { PAGE_SIZE } from '../utils/constant'

export default {
  getList({ pageIndex, channelName }) {
    const params = { pageIndex, pageSize: PAGE_SIZE, channelName };
    return request('/lottery/order/withDrawList', {
      method: 'get',
      data: params
    });
  }
}
