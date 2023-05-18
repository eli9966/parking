/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  if (currentUser && (currentUser.access === 'ADMIN' || currentUser.access === 'SUPERADMIN')) {
    console.log("admin")
    return {
      canAdmin: true,
      canUser: false,
    };
  } else if (currentUser && currentUser.access === 'USER') {
    console.log("user")
    return {
      canUser: true,
      canAdmin: false,
    };
  }
  return {
    canUser: false,
    canAdmin: false,
  };
}
