/*
 Firestore版ランキングルームAPI。UIからはローカル版と同じ部屋モデルへ変換して使う。
*/
import { getFirebaseContext } from './firebase.js';

function memberPayload(name,snapshot,serverTimestamp){
  return {
    nickname:String(name||'あなた').slice(0,16),
    overall:snapshot.overall||0,
    stars:snapshot.stars||0,
    clears:snapshot.clears||0,
    correct:snapshot.correct||0,
    accuracy:snapshot.accuracy||0,
    streak:snapshot.streak||0,
    study:snapshot.study||0,
    medals:snapshot.medals||0,
    updatedAt:serverTimestamp()
  };
}

export async function createFirebaseRoom(room){
  var ctx=await getFirebaseContext();
  if(!ctx) return null;
  var f=ctx.firestore,uid=ctx.auth.currentUser.uid;
  var batch=f.writeBatch(ctx.db);
  var roomRef=f.doc(ctx.db,'rooms',room.id);
  var inviteRef=f.doc(ctx.db,'invites',room.code);
  var memberRef=f.doc(ctx.db,'rooms',room.id,'members',uid);
  batch.set(roomRef,{name:room.name,ownerId:uid,code:room.code,createdAt:f.serverTimestamp()});
  batch.set(inviteRef,{roomId:room.id,ownerId:uid,createdAt:f.serverTimestamp()});
  batch.set(memberRef,memberPayload(room.members[0].name,room.members[0].snapshot,f.serverTimestamp));
  await batch.commit();
  return room.id;
}

export async function joinFirebaseRoom(code,name,snapshot){
  var ctx=await getFirebaseContext();
  if(!ctx) return null;
  var f=ctx.firestore;
  var invite=await f.getDoc(f.doc(ctx.db,'invites',String(code).toUpperCase()));
  if(!invite.exists()) throw new Error('招待コードが見つかりません。');
  var roomId=invite.data().roomId;
  await f.setDoc(
    f.doc(ctx.db,'rooms',roomId,'members',ctx.auth.currentUser.uid),
    memberPayload(name,snapshot,f.serverTimestamp),
    {merge:true}
  );
  return roomId;
}

export async function syncFirebaseProgress(roomId,name,snapshot){
  var ctx=await getFirebaseContext();
  if(!ctx) return;
  var f=ctx.firestore;
  await f.setDoc(
    f.doc(ctx.db,'rooms',roomId,'members',ctx.auth.currentUser.uid),
    memberPayload(name,snapshot,f.serverTimestamp),
    {merge:true}
  );
}

export async function loadFirebaseRoom(roomId){
  var ctx=await getFirebaseContext();
  if(!ctx) return null;
  var f=ctx.firestore;
  var roomDoc=await f.getDoc(f.doc(ctx.db,'rooms',roomId));
  if(!roomDoc.exists()) return null;
  var memberDocs=await f.getDocs(f.collection(ctx.db,'rooms',roomId,'members'));
  return {
    id:roomId,
    code:roomDoc.data().code,
    name:roomDoc.data().name,
    ownerId:roomDoc.data().ownerId,
    members:memberDocs.docs.map(function(doc){
      var data=doc.data();
      return {
        id:doc.id,
        name:data.nickname,
        isPlayer:doc.id===ctx.auth.currentUser.uid,
        snapshot:data
      };
    })
  };
}
