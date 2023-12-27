export const apiPath = {
   AUTH: {
      LOGIN: '/login',
      REGISTER: '/register',
   },
   CHANEL: {
      MY_LIST: '/channel/my-channels',
      EDIT_BY_ID: '/channel/edit/{id}',
      DELETE_BY_ID: '/channel/delete/{id}',
      CREATE: '/channel/create',
   },
   FOLLOW: {
      CREATE: '/flow/create',
      MY_LIST: '/flow/my-flows',
      DETAIL_BY_ID: '/flow/{id}',
      EDIT: '/flow/edit',
      DELETE: '/flow/delete/{id}',
      // /api
   },
   INTENT: {
      CREATE: '/intent/train',
      GET_LIST: '/intent',
      DETAIL_BY_ID: '/intent/{id}',
      DELETE: '/intent/delete/{id}',

      // /api/intent/1
   },
};
