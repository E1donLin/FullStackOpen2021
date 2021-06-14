const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const modifiedBlogs = blogs.map((blog) => {
    return { title: blog.title, author: blog.author, likes: blog.likes }
  })

  const reducer = (mostLiked, blog) => {
    return mostLiked.likes > blog.likes ? mostLiked : blog
  }

  return modifiedBlogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs, 'author')
  const mostBlogsAuthor = {
    author: '',
    blogs: 0,
  }
  for (const property in authors) {
    if (authors[property] > mostBlogsAuthor.blogs) {
      mostBlogsAuthor.author = property
      mostBlogsAuthor.blogs = authors[property]
    }
  }

  return mostBlogsAuthor
}

const mostLikes = (blogs) => {
  const authors = _.groupBy(blogs, 'author')
  const mostLikesAuthor = {
    author: null,
    likes: 0,
  }
  for (const property in authors) {
    authors[property] = _.sumBy(authors[property], 'likes')
  }
  for (const property in authors) {
    if (authors[property] > mostLikesAuthor.likes) {
      mostLikesAuthor.author = property
      mostLikesAuthor.likes = authors[property]
    }
  }
  return mostLikesAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
