/*
 Firebase初期化。設定が空の間はロードせず、既存のローカルランキングを維持する。
 SDKはnpmで固定した版と同じ12.16.0を公式CDNから読み込む。
*/
import { FIREBASE_CONFIG, FIREBASE_ENABLED } from '../config/firebase-config.js';

const SDK_VERSION = '12.16.0';
let contextPromise = null;

export function firebaseAvailable(){
  return FIREBASE_ENABLED;
}

export async function getFirebaseContext(){
  if(!FIREBASE_ENABLED) return null;
  if(contextPromise) return contextPromise;

  contextPromise = Promise.all([
    import('https://www.gstatic.com/firebasejs/'+SDK_VERSION+'/firebase-app.js'),
    import('https://www.gstatic.com/firebasejs/'+SDK_VERSION+'/firebase-auth.js'),
    import('https://www.gstatic.com/firebasejs/'+SDK_VERSION+'/firebase-firestore.js')
  ]).then(async function(modules){
    var appApi=modules[0],authApi=modules[1],firestoreApi=modules[2];
    var app=appApi.initializeApp(FIREBASE_CONFIG);
    var auth=authApi.getAuth(app);
    if(!auth.currentUser) await authApi.signInAnonymously(auth);
    return {
      app:app,
      auth:auth,
      db:firestoreApi.getFirestore(app),
      firestore:firestoreApi
    };
  });
  return contextPromise;
}
