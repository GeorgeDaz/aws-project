// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useState } from 'react'
import axios from 'axios'


export default function App() {

  const [post, setPost] = useState({
    title: '',
    photo: null,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append('photo', post.photo)
    const response = await axios.post('http://localhost:3000/upload', formData, {
      headers: {
        "Content-Type": "multi-part/form-data"
      }

    })
    console.log(response)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='title' onChange={e => setPost({ ...post, title: e.target.value })} />
        {/* <input type="file" name="photo" id="photo" onChange={e => console.log(e)} /> */}
        <input type="file" name="photo" id="photo" onChange={e => setPost({ ...post, photo: e.target.files[0] })} />
        <button>Subir</button>
      </form>
    </div>
  )
}