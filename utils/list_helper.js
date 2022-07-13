const _ = require('lodash')
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {      
  return blogs.reduce((x, y) => y.likes > x.likes ? y : x)
}

const mostBlogs = (blogs) => {
  const authorByNumberDictionary  = _.countBy(blogs,'author')
  const authorWithMostBlogs = Object.keys(authorByNumberDictionary).reduce((x, y) => authorByNumberDictionary[y] > authorByNumberDictionary[x] ? y : x)

  return {
    author: authorWithMostBlogs,
    blogs: authorByNumberDictionary[authorWithMostBlogs]
  }
}

const mostLikes = (blogs) => {
  var authorsByLikes = []
  blogs.forEach(blog => {
    if (blog in authorsByLikes) {
      authorsByLikes[blog.author] += blog.likes
    } else {
      authorsByLikes[blog.author] = blog.likes
    }
  })
  const maxCount = Math.max(...Object.values(authorsByLikes))
  const authorWithMostLikes = Object.keys(authorsByLikes).find(key => authorsByLikes[key] === maxCount)
  return {
    author: authorWithMostLikes,
    likes: maxCount
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}