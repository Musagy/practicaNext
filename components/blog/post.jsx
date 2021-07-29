import React from "react"
import Link from "next/dist/client/link"

const Post = ({ post }) => (
  <div>
    <h2>{post.title}</h2>
    <p>{post.body}</p><br />
    <Link href={`/blog/${post.id}`}><a>Leer más...</a></Link>
  </div>
)

export default Post