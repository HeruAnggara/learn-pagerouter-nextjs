import RootLayout from '@/layout'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const metaTitle = router.pathname.split('/')[1]

  return (
    <SessionProvider>
      <RootLayout metaTitle={metaTitle}>
        <Component {...pageProps} />
      </RootLayout>
    </SessionProvider>
  )
}
