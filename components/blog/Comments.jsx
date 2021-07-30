import Axios from "axios"
import React, { useState, useEffect } from "react"

const Comments = ({ id }) => {
  const [comments,setComments] = useState()
  const [number,setNumber] = useState(0)

  useEffect( () => {
    if(number > 0) {
      Axios.get(`${process.env.API_BLOG}posts/${id}/comments`)
        .then(resp => {
          setComments(resp.data)
        })
    }
  }, [number,id])

  if(!comments) return(
    <div>
      <a onClick={ () => setNumber(number + 1) }>Cargando comentarios...</a>
    </div>
  )

  return (
    <div>
      <h2>Comentarios</h2><br />
      {
        comments.map(c => (
          <div key={c.id}>
            <h3>{c.email}</h3>
            <span><b>Comentario de:</b> {c.name}</span>
            <br /><br />
            <p>{c.body}</p>
            <br /><br />
          </div>
        ))
      }
    </div>
  )

}

export default Comments