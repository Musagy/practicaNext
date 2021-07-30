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
  }, [number])

  if(!comments) return(
    <div>
      <a onClick={ () => setNumber(number + 1) }>Cargando comentarios...</a>
    </div>
  )

  return <span> {JSON.stringify(comments)} </span>

}

export default Comments