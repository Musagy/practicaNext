import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import styles from '../styles/Home.module.css'

const Segunda = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>About | {process.env.SITE_NAME}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>
          Esta es la segunda pagina
        </h1>
        <span>Subtitulo 2</span>
        <br/>
        <br/>
        <Link href="/"> Volver... </Link>
      </main>
    </div>
  )
}
export default Segunda