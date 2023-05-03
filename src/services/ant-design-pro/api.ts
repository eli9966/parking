// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}
// 获取面板数据
export async function queryPanalData(options?: { [key: string]: any }) {
  return request<{
    data: API.PanelData;
  }>('/api/admin/queryPanalData', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function queryLineData(options?: { [key: string]: any }) {
  return request<{
    data: API.LineData[];
  }>('/api/admin/queryLineData', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function queryPieData(options?: { [key: string]: any }) {
  return request<{
    data: API.PieData[];
  }>('/api/admin/queryPieData', {
    method: 'GET',
    ...(options || {}),
  });
}


export async function queryOrderList(options?: { [key: string]: any }) {
  return request<{
    [x: string]: any;
    data: API.OrderListTable;
  }>('/api/orders', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function queryUserList(params: {
  // query
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
}, options?: { [key: string]: any }) {
  return request<{
    [success: string]: any;
    data: API.UserListTable;

  }>('/api/users', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function deleteUser(id: string, options?: { [key: string]: any }) {
  return request<{
    [success: string]: any;

  }>(`/api/users/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
export async function addUser(data: any, options?: { [key: string]: any }) {
  return request<API.UserListItem>('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
    ...(options || {}),
  });
}
export async function queryParkingSpace(params: {
  // query
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
}, options?: { [key: string]: any }) {
  return request<{
    [success: string]: any;
    data: API.ParkingSpaceTable;
  }>('/api/parkingSpace', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function querySuggestions(params: {
  // query
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
}, options?: { [key: string]: any }) {
  return request<{
    [success: string]: any;
    data: API.SuggestionTable;
  }>('/api/suggestions', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function deleteSuggestions(id: string, options?: { [key: string]: any }) {
  return request<{
    [success: string]: any;

  }>(`/api/suggestions/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
export async function addSuggestions(data: any, options?: { [key: string]: any }) {
  return request<API.UserListItem>('/api/suggestions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
    ...(options || {}),
  });
}
export async function updateSuggestions(id: string, data: any, options?: { [key: string]: any }) {
  return request<API.UserListItem>(`/api/suggestions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
    ...(options || {}),
  });
}

export async function queryNotices(params: {
  // query
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
}, options?: { [key: string]: any }) {
  return request<{
    [success: string]: any;
    data: API.NoticeTable;
  }>('/api/notices', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function deleteNotices(id: string, options?: { [key: string]: any }) {
  return request<{
    [success: string]: any;

  }>(`/api/notices/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
export async function addNotices(data: any, options?: { [key: string]: any }) {
  return request<API.NoticeItem>('/api/notices', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
    ...(options || {}),
  });
}
export async function updateNotices(id: string, data: any, options?: { [key: string]: any }) {
  return request<API.NoticeItem>(`/api/notices/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
    ...(options || {}),
  });
}
export async function deleteParkingSpace(id: string, options?: { [key: string]: any }) {
  return request<{
    [success: string]: any;

  }>(`/api/parkingSpace/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
export async function addParkingSpace(data: any, options?: { [key: string]: any }) {
  return request<API.UserListItem>('/api/parkingSpace', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
    ...(options || {}),
  });
}
/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
