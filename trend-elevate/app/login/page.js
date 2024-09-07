"use client";
import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '../../firebase';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import img from '../../public/Login-back.jpg';
import apple from '../../public/AppleW.png';
import google from '../../public/Google.png';
import windows from '../../public/Windows.png';
import logo from '@/public/LogoTE.png';
import 'normalize.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!');
      // Redirect to the home screen or any other page upon successful login
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing in:', error.message);
      toast.error('Incorrect email or password');
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      toast.success('Login successful!');
      // Redirect to the home screen or any other page upon successful login
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
      toast.error('Error signing in with Google');
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

          <form className={styles.inputs} onSubmit={handleSubmit}>
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
              Sign in
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
            Need an account? <Link href='/signup'>Sign Up</Link>
          </div>
        </div>

        <div className={styles.col2}>
          <Image className={styles.imgback} src={img} alt='background' />
        </div>
      </div>
    </section>
  );
}