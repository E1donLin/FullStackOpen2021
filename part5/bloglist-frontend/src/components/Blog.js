import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlogs }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = async () => {
    const newBlog = {
      id: blog.id,
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    await blogService.update(blog.id, newBlog)
    updateBlogs()
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      updateBlogs()
    }
  }

  const blogDetails = () => (
    <>
      {blog.url}
      <br />
      {blog.likes}
      <button onClick={() => handleLike()}>like</button>
      <br />
      {blog.author}
      <br />
      <button onClick={() => handleRemove()}>remove</button>
    </>
  )

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      <div className="details" style={showWhenVisible}>
        {blogDetails()}
      </div>
    </div>
  )
}

export default Blog
