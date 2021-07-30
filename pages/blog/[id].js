import Head from "next/dist/next-server/lib/head"
import Link from "next/dist/client/link"
import fetch from "node-fetch"
import Comments from "../../components/blog/Comments"

const PostForId = ({ post }) => (
  <div className="ed-grid">
    <Head>
      <title>{post.title} | {process.env.SITE_NAME}</title>
    </Head>
    <main>
      <div>
        <h1>{post.title}</h1>
        <span>{`escrito por el usuario de ID ${post.userId}`}</span>
        <br /><br />
        <p>{post.body}</p>
        <Link href={`/`}><a>volver</a></Link>
      </div>
      <Comments id={post.id} />
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