import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword,  signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, addDoc, query, where } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyBnQ5EY4BeymqeUWMglYnMfU74RGe04SE4",
  authDomain: "trendelevate-7f5f9.firebaseapp.com",
  projectId: "trendelevate-7f5f9",
  storageBucket: "trendelevate-7f5f9.appspot.com",
  messagingSenderId: "866791403048",
  appId: "1:866791403048:web:22931aea0a55d5270d4f1d",
  measurementId: "G-H8L5HLCNKV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app); 

const getUserData = async (userId) => {
  try {
    const userDoc = await getDoc(doc(firestore, 'users', userId));
    if (userDoc.exists()) {
      console.log('User document:', userDoc.data());
      return userDoc.data();
    } else {
      console.error('User document not found');
      return {};
    }
  } catch (error) {
    console.error('Error getting user data:', error);
    return {};
  }
};

const storePaymentInformation = async (userEmail, paymentDetails) => {
  try {
    const paymentRef = await addDoc(collection(firestore, 'payments'), {
      userEmail: userEmail,
      cardDetails: paymentDetails.cardDetails,
      cvc: paymentDetails.cvc,
      expiryDate: paymentDetails.expiryDate,
      currentDate: paymentDetails.currentDate
    });
    console.log('Payment information stored successfully with ID:', paymentRef.id);
  } catch (error) {
    console.error('Error storing payment information:', error);
    throw error;
  }
};

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, firestore, doc, setDoc, addDoc, getUserData, storePaymentInformation, query, where};