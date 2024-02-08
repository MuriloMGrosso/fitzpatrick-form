import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getFirestore, collection, addDoc} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyARBu83-uLTUPAIrnBvuUjDe6B6A5PEFdw",
    authDomain: "fitzpatrick-form.firebaseapp.com",
    projectId: "fitzpatrick-form",
    storageBucket: "fitzpatrick-form.appspot.com",
    messagingSenderId: "805442644977",
    appId: "1:805442644977:web:32e13f5ba1ec8476f9f250"
});

const firestore = getFirestore();
const userInformationColletion = collection(firestore, 'userInformation');

export async function addNewUserInformation(docData)
{
    try{
        await addDoc(userInformationColletion, docData);
        console.log("Dados armazenados com sucesso!");
    }
    catch(error){
        console.log(`Um erro ocorreu: ${error}`);
    }
}