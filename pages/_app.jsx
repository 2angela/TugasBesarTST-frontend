import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import Head  from 'next/head';
import { ToastContainer } from 'react-toastify';
export default function App({ Component, pageProps }) {
  return <>
      <Head>
        <title>Virtual Hotel Tour</title>
        <meta name="title" content="Virtual Hotel Tour with Customized Meal Kit Delivery Service"/>
        <meta name="robots" content="index, follow"/>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>

      </Head>
    <Component {...pageProps} />
    <ToastContainer autoClose={2000} draggable={false} containerId={1} key={1} limit={1} pauseOnFocusLoss={false} position='top-right' closeButton />
  </>
}
