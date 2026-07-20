/*
 Firebaseコンソール > プロジェクトの設定 > マイアプリ > SDKの設定
 に表示されるfirebaseConfigを貼り付ける。秘密鍵ではないが、値は環境ごとに管理する。
*/
export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDFQqIU8RwD8hv1zh1_VE1IMQR7jGKCIXQ',
  authDomain: 'code-case-bureau-2026.firebaseapp.com',
  projectId: 'code-case-bureau-2026',
  storageBucket: 'code-case-bureau-2026.firebasestorage.app',
  messagingSenderId: '89896901654',
  appId: '1:89896901654:web:26e93191d0ca4bbb7be937'
};

export const FIREBASE_ENABLED = Boolean(
  FIREBASE_CONFIG.apiKey &&
  FIREBASE_CONFIG.authDomain &&
  FIREBASE_CONFIG.projectId &&
  FIREBASE_CONFIG.appId
);
