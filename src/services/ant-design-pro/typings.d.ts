// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };
  type PanelData = {
    userCount?: number;
    orderCount?: number;
    traffic?: number;
    vacParkingSpace?: number;
  };
  type OrderListItem = {
    id?: string;
    orderNo?: string;
    orderType?: string;
    orderTime?: string;
    orderUser?: string;
    orderRemark?: string;
    orderParkingSpace?: string;
    orderParkingSpacePrice?: string;
    orderParkingSpaceDesc?: string;
  }
  type UserListItem = {
    id?: string;
    userName?: string;
    phone?: string;
    address?: string;
    idNum?: string;
    lastLongin?: string;
    Role?: string;
  }
  type UserListTable = {
    list?: UserListItem[];
    total?: number;
    success?: boolean;
  }
  type ParkingSpaceItem = {
    id?: string;
    location?: string;
    number?: string;
    price?: string;
    desc?: string;
    status?: string;
    type?: string;
    operateTime?: string;
  }
  type ParkingSpaceTable = {
    list?: ParkingSpaceItem[];
    total?: number;
    success?: boolean;
  }
  type LineData = {
    Date?: string;
    scale?: number;
  }
  type PieData = {
    type?: string;
    value?: number;
  }

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
