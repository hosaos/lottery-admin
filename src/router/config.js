// 仅用于生成菜单及相关路由, 不含Content内部嵌套
import { NotFound, DashBoard, ChannelList, LotteryRecordList, LotteryOrderList, LotteryRelationList, AppUserList, WebUserList, Ordinary, ChartsEG, Protected } from "../routes";

export default [
  {
    path: '/dashboard', // 路由path, Redirect的from, 菜单key
    title: '首页', // 菜单文本, 不填则不会生成菜单
    icon: 'dashboard', // 菜单图标
    component: DashBoard, // 路由component
    strict: true, // 其他可以被无损转发到Route, Menu.Item的prop
  },
  {
    path: '/lotteryRecords',
    title: '彩票录入管理',
    icon: 'bars',
    component: LotteryRecordList,
    roles: [1],
  },
  // todo
  {
    path: '/lotteryRelations',
    title: '兑奖管理',
    icon: 'bars',
    component: LotteryRelationList,
    roles: [2],
  },
  {
    title: '后台管理',
    icon: 'appstore-o',
    path: '/admin',
    subRoutes: [
      // todo
      {
        path: '/list',
        title: '数据概括',
        icon: 'bars',
        component: Protected,
        roles: [3],
      },
      {
        path: '/list1',
        title: '结算管理',
        icon: 'bars',
        component: Protected,
        roles: [4],
      },
      {
        path: '/appUsers',
        title: '用户管理',
        icon: 'bars',
        component: AppUserList,
        roles: [5],
      },
      // todo
      {
        path: '/list2',
        title: '中奖纪录',
        icon: 'bars',
        component: Protected,
        roles: [6],
      },
      {
        path: '/lotteryOrders',
        title: '订单管理',
        icon: 'bars',
        component: LotteryOrderList,
        roles: [7],
      },
      {
        path: '/list4',
        title: '提现管理',
        icon: 'bars',
        component: Protected,
        roles: [8],
      },
      {
        path: '/channels',
        title: '渠道列表',
        icon: 'bars',
        component: ChannelList,
        roles: [9],
      },
      {
        path: '/webUsers',
        title: '员工管理',
        icon: 'bars',
        component: WebUserList,
        roles: [10],
      },
    ]
  },
  {
    path: '/dev',
    title: '权限dev',
    icon: 'lock',
    roles: ['dev'],
    component: Protected,
  },
  {
    path: '/qaui',
    title: '权限qa,ui',
    icon: 'lock',
    roles: ['qa', 'ui'],
    component: Protected,
  },
  {
    path: '/', // Redirect的from
    exact: true,
    redirect: '/dashboard', // Redirect
  },
  {
    component: NotFound,
  }
]
