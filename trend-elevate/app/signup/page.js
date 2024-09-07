"use client";
import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,firestore, doc, setDoc } from '../../firebase';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import img from '../../public/Login-back.jpg';
import apple from '../../public/AppleW.png';
import google from '../../public/Google.png';
import windows from '../../public/Windows.png';
import logo from '../../public/LogoTE.png';
import 'normalize.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userRef = doc(firestore, 'users', user.uid);
      await setDoc(userRef, {
        email: user.email,
        name: name,
        // Add other user data as needed
      });
      
      toast.success('Signup successful!');
      
      window.location.href = '/';
      
    } catch (error) {
      console.error('Error signing up:', error.message);
      toast.error(`Error signing up: ${error.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(firestore, 'users', user.uid);
      await setDoc(userRef, {
        email: user.email,
        name: user.displayName,
        // Add other user data as needed
      });

      toast.success('Google sign-in successful!');
      window.location.href = '/';
    } catch (error) {
      console.error('Error with Google sign-in:', error.message);
      toast.error(`Error with Google sign-in: ${error.message}`);
    }
  };
  
  

  return (
    <section className={styles.back}>
      <div className={styles.blurbg}></div>

      <div className={styles.register}>
        <div className={styles.col1}>
          <div className={styles.logodiv}>
            <Image className={styles.logo} src={logo} alt='Logo' />
          </div>

          <h1 className={styles.h1}>Sign up or Login with</h1>

          <div className={styles.btndiv}>
            <button className={styles.applebtn}>
              <Image className={styles.appleimg} src={apple} alt='applelogo' />
              <span className={styles.AppleN}>Apple</span>
            </button>

            <button className={styles.googlebtn} onClick={handleGoogleSignIn}>
              <Image className={styles.googleimg} src={google} alt='googlelogo' />
              <span className={styles.GoogleN}>Gmail</span>
            </button>

            <button className={styles.windowsbtn}>
              <Image className={styles.windowsimg} src={windows} alt='windowslogo' />
              <span className={styles.WindowsN}>Microsoft</span>
            </button>
          </div>

          <div className={styles.divider}>
            <div className={styles.solid}>
              <div className={styles.divcircle}>OR</div>
            </div>
          </div>

          <div className={styles.AccSign}> Sign up with a new account</div>

          <form className={styles.inputs} onSubmit={handleSubmit}>
            <input
              type='text' 
              placeholder='Your name' 
              value={name}
              onChange={(e) => setName(e.target.value)} 
            />
            <input
              type='email'
              placeholder='Your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit' className={styles.signbtn}>
              Sign up
            </button>
          </form>

          <ToastContainer
            position='top-center'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
          />

          <div className={styles.toLogin}>
            Already have an account? <Link href='/login'>Sign In</Link>
          </div>
        </div>

        <div className={styles.col2}>
          <Image className={styles.imgback} src={img} alt='background' />
        </div>
      </div>
    </section>
  );
}