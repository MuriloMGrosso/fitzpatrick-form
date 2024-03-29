import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getFirestore, collection, addDoc} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';
import { getStorage, ref, uploadString, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyARBu83-uLTUPAIrnBvuUjDe6B6A5PEFdw",
    authDomain: "fitzpatrick-form.firebaseapp.com",
    projectId: "fitzpatrick-form",
    storageBucket: "fitzpatrick-form.appspot.com",
    messagingSenderId: "805442644977",
    appId: "1:805442644977:web:32e13f5ba1ec8476f9f250"
});

const firestore = getFirestore();
const fitzpatrickColletion = collection(firestore, 'fitzpatrickForm');
const monkColletion = collection(firestore, 'monkForm');

const storage = getStorage();

export async function addNewFitzpatrickForm(docData)
{
    try{
        await addDoc(fitzpatrickColletion, docData);
        console.log("Dados armazenados com sucesso!");
    }
    catch(error){
        console.log(`Um erro ocorreu: ${error}`);
    }
}

export async function addNewMonkForm(docData)
{
    try{
        const forearmRef = ref(storage, `images/forearms/forearm_${docData['timestamp']}`);

        await uploadString(forearmRef, docData['forearmPhoto'], 'data_url');
        console.log("Imagem enviada com sucesso!");

        await getDownloadURL(forearmRef).then((url) => {
            docData['forearmPhoto'] = url;
        });

        await addDoc(monkColletion, docData);
        console.log("Dados armazenados com sucesso!");
    }
    catch(error)
    {
        console.log(`Um erro ocorreu: ${error}`);
    }
}