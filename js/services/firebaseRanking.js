/*
 Firestore版ランキングルームAPI。UIからはローカル版と同じ部屋モデルへ変換して使う。
*/
import { getFirebaseContext } from './firebase.js';

function memberPayload(name,snapshot,serverTimestamp,clientId){
  return {
    clientId:String(clientId||'').slice(0,64),
    nickname:String(name||'あなた').slice(0,16),
    overall:snapshot.overall||0,
    dailyStreak:snapshot.dailyStreak||0,
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

export async function createFirebaseRoom(room,clientId){
  var ctx=await getFirebaseContext();
  if(!ctx) return null;
  var f=ctx.firestore,uid=ctx.auth.currentUser.uid;
  var batch=f.writeBatch(ctx.db);
  var roomRef=f.doc(ctx.db,'rooms',room.id);
  var inviteRef=f.doc(ctx.db,'invites',room.code);
  var memberRef=f.doc(ctx.db,'rooms',room.id,'members',uid);
  batch.set(roomRef,{name:room.name,ownerId:uid,code:room.code,createdAt:f.serverTimestamp()});
  batch.set(inviteRef,{roomId:room.id,ownerId:uid,createdAt:f.serverTimestamp()});
  batch.set(memberRef,memberPayload(room.members[0].name,room.members[0].snapshot,f.serverTimestamp,clientId||room.members[0].id));
  await batch.commit();
  return room.id;
}

export async function joinFirebaseRoom(code,name,snapshot,clientId){
  var ctx=await getFirebaseContext();
  if(!ctx) return null;
  var f=ctx.firestore;
  var invite=await f.getDoc(f.doc(ctx.db,'invites',String(code).toUpperCase()));
  if(!invite.exists()) throw new Error('招待コードが見つかりません。');
  var roomId=invite.data().roomId;
  await f.setDoc(
    f.doc(ctx.db,'rooms',roomId,'members',ctx.auth.currentUser.uid),
    memberPayload(name,snapshot,f.serverTimestamp,clientId),
    {merge:true}
  );
  return roomId;
}

export async function syncFirebaseProgress(roomId,name,snapshot,clientId){
  var ctx=await getFirebaseContext();
  if(!ctx) return;
  var f=ctx.firestore;
  await f.setDoc(
    f.doc(ctx.db,'rooms',roomId,'members',ctx.auth.currentUser.uid),
    memberPayload(name,snapshot,f.serverTimestamp,clientId),
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
    members:dedupeMembers(memberDocs.docs.map(function(doc){
      var data=doc.data();
      return {
        id:doc.id,
        clientId:data.clientId||'',
        name:data.nickname,
        isPlayer:doc.id===ctx.auth.currentUser.uid,
        snapshot:data
      };
    }),ctx.auth.currentUser.uid)
  };
}

function dedupeMembers(members,currentUid){
  var byClientId={};
  return members.filter(function(member){
    if(!member.clientId) return true;
    var existing=byClientId[member.clientId];
    if(!existing){
      byClientId[member.clientId]=member;
      return true;
    }
    if(member.id===currentUid){
      var index=members.indexOf(existing);
      if(index!==-1) existing.__duplicate=true;
      byClientId[member.clientId]=member;
      return true;
    }
    member.__duplicate=true;
    return false;
  }).filter(function(member){ return !member.__duplicate; });
}

export async function kickFirebaseMember(roomId,userId){
  var ctx=await getFirebaseContext();
  if(!ctx) return;
  await ctx.firestore.deleteDoc(ctx.firestore.doc(ctx.db,'rooms',roomId,'members',userId));
}

export async function subscribeFirebaseRoomMembers(room,onUpdate,onError){
  var ctx=await getFirebaseContext();
  if(!ctx||!room) return function(){};
  var f=ctx.firestore;
  return f.onSnapshot(
    f.collection(ctx.db,'rooms',room.id,'members'),
    function(snapshot){
      onUpdate({
        id:room.id,
        code:room.code,
        name:room.name,
        ownerId:room.ownerId,
        isFirebase:true,
        members:dedupeMembers(snapshot.docs.map(function(doc){
          var data=doc.data();
          return {
            id:doc.id,
            clientId:data.clientId||'',
            name:data.nickname,
            isPlayer:doc.id===ctx.auth.currentUser.uid,
            snapshot:data
          };
        }),ctx.auth.currentUser.uid)
      });
    },
    onError||function(){}
  );
}
