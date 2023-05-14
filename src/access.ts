/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  if ( currentUser && (currentUser.access === 'admin' || currentUser.access==='superAdmin')){
    return {
      canAdmin: true,
    };
  }else if(currentUser && currentUser.access === 'user'){
    return {
      canUser: true,
    };
  }
}
