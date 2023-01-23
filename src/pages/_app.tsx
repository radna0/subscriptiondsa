import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import styles from '@/styles/Home.module.css'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={styles.main + ' bg-slate-900'}>
      <Component {...pageProps} />
    </main>
  )
}
