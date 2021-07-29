import Head from "next/dist/next-server/lib/head"
import Link from "next/dist/client/link"
import fetch from "node-fetch"

const PostForId = ({ post }) => (
  <div /*className={styles.container}*/>
    <Head>
      <title>{post.title} | {process.env.SITE_NAME}</title>
    </Head>
    <main>
      <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <span>{`escrito por el usuario ${post.userId}`}</span>
        <br />
        <Link href={`/`}><a>volver</a></Link>
      </div>
    </main>
  </div>
)

PostForId.getInitialProps = async function(context) {
  
  const { id } = context.query
  const res = await fetch(`${process.env.API_BLOG}posts/${id}`)
  const post = await res.json()
  
  return {
    post
  }
}

export default PostForId