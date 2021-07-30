import React from "react"
import Link from "next/dist/client/link"

const Post = ({ post }) => (
  <article className="s-radius-1 s-shadow-bottom course-card background s-shadow-card-micro white-color nowrap s-column s-nb-0 s-pxy-3">
    <h2>{post.title}</h2>
    <p>{post.body}</p>
    <Link href={`/blog/${post.id}`}><a>Leer más...</a></Link>
  </article>
)

export default Post