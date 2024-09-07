"use client";
import styles from './navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import 'normalize.css';
import logo from '../public/TrendElevate.png';
import { useAuth } from '@/app/context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    return (
        <header className={styles.header}>
            <Image className={styles.logoimage} src={logo} alt='Trend-Elevate'></Image>
            <nav className={styles.nav}>
                <Link href="/" className={styles.menu}>Home</Link>
                <Link href="/about" className={styles.menu}>About</Link>
                <Link href="/pricing" className={styles.menu}>Pricing</Link>
                {user ? (
        <>
          <Link href="/dashboard" className={styles.menu}>Dashboard</Link>
          <button className={styles.signInButton} onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <Link href="/login" className={styles.menu}>
          <button className={styles.signInButton}>Login</button>
        </Link>
      )}
            </nav>
        </header>
    );
}