import HeaderMain from '../components/sections/Header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return(
    <>
      <HeaderMain />
      <Component {...pageProps} />
    </>
  ) 
}

export default MyApp
