// Firebase 설정 완료!
const firebaseConfig = {
    apiKey: "AIzaSyDGyjgliEnlhKHwQZa4NFUPStbn-tfxTmk",
    authDomain: "eallim-9707c.firebaseapp.com",
    projectId: "eallim-9707c",
    storageBucket: "eallim-9707c.firebasestorage.app",
    messagingSenderId: "551108125866",
    appId: "1:551108125866:web:0a39e80c6973e67df59cd3"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// Firestore 데이터베이스
const db = firebase.firestore();

// ========== 데이터베이스 함수들 ==========

// 데이터 가져오기
async function getData(collectionName) {
    try {
        const snapshot = await db.collection(collectionName).orderBy('date', 'desc').get();
        const data = [];
        snapshot.forEach(doc => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (error) {
        console.error('데이터 가져오기 실패:', error);
        return [];
    }
}

// 데이터 추가하기
async function addData(collectionName, data) {
    try {
        const docRef = await db.collection(collectionName).add({
            ...data,
            date: Date.now()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('데이터 추가 실패:', error);
        return { success: false, error: error.message };
    }
}

// 데이터 수정하기
async function updateData(collectionName, docId, data) {
    try {
        await db.collection(collectionName).doc(docId).update(data);
        return { success: true };
    } catch (error) {
        console.error('데이터 수정 실패:', error);
        return { success: false, error: error.message };
    }
}

// 데이터 삭제하기
async function deleteData(collectionName, docId) {
    try {
        await db.collection(collectionName).doc(docId).delete();
        return { success: true };
    } catch (error) {
        console.error('데이터 삭제 실패:', error);
        return { success: false, error: error.message };
    }
}

// 설정 가져오기
async function getSettings() {
    try {
        const doc = await db.collection('settings').doc('main').get();
        if (doc.exists) {
            return doc.data();
        }
        return {};
    } catch (error) {
        console.error('설정 가져오기 실패:', error);
        return {};
    }
}

// 설정 저장하기
async function saveSettings(settings) {
    try {
        await db.collection('settings').doc('main').set(settings, { merge: true });
        return { success: true };
    } catch (error) {
        console.error('설정 저장 실패:', error);
        return { success: false, error: error.message };
    }
}

console.log('✅ Firebase 연결 준비 완료!');

