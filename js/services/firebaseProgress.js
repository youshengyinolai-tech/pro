/* 同期コードで複数端末を同じ進捗ドキュメントへ接続するFirestore API。 */
import { getFirebaseContext } from './firebase.js';

function makeCode(){
  var chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',code='';
  for(var i=0;i<10;i++) code+=chars[Math.floor(Math.random()*chars.length)];
  return code;
}

export async function createProgressLink(payload){
  var ctx=await getFirebaseContext();
  if(!ctx) return null;
  var f=ctx.firestore,uid=ctx.auth.currentUser.uid;
  var code=makeCode(),syncId=f.doc(f.collection(ctx.db,'syncProfiles')).id;
  var batch=f.writeBatch(ctx.db);
  batch.set(f.doc(ctx.db,'syncCodes',code),{syncId:syncId,ownerId:uid,createdAt:f.serverTimestamp()});
  batch.set(f.doc(ctx.db,'syncProfiles',syncId),{ownerId:uid,payload:payload,revision:1,updatedAt:f.serverTimestamp()});
  batch.set(f.doc(ctx.db,'syncProfiles',syncId,'devices',uid),{code:code,joinedAt:f.serverTimestamp()});
  await batch.commit();
  return {syncId:syncId,code:code};
}

export async function joinProgressLink(code){
  var ctx=await getFirebaseContext();
  if(!ctx) return null;
  var f=ctx.firestore,normalized=String(code||'').trim().toUpperCase();
  var codeDoc=await f.getDoc(f.doc(ctx.db,'syncCodes',normalized));
  if(!codeDoc.exists()) throw new Error('同期コードが見つかりません。');
  var syncId=codeDoc.data().syncId,uid=ctx.auth.currentUser.uid;
  await f.setDoc(f.doc(ctx.db,'syncProfiles',syncId,'devices',uid),{code:normalized,joinedAt:f.serverTimestamp()});
  var profile=await f.getDoc(f.doc(ctx.db,'syncProfiles',syncId));
  if(!profile.exists()) throw new Error('同期データが見つかりません。');
  return {syncId:syncId,code:normalized,payload:profile.data().payload||{},revision:profile.data().revision||0};
}

export async function pushProgressLink(syncId,payload,revision){
  var ctx=await getFirebaseContext();
  if(!ctx||!syncId) return;
  var f=ctx.firestore;
  await f.setDoc(f.doc(ctx.db,'syncProfiles',syncId),{
    payload:payload,revision:(revision||0)+1,updatedAt:f.serverTimestamp()
  },{merge:true});
}

export async function subscribeProgressLink(syncId,onUpdate,onError){
  var ctx=await getFirebaseContext();
  if(!ctx||!syncId) return function(){};
  var f=ctx.firestore;
  return f.onSnapshot(f.doc(ctx.db,'syncProfiles',syncId),function(doc){
    if(doc.exists()) onUpdate(doc.data());
  },onError||function(){});
}
