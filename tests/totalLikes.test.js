const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('favorite blog', () => {
  const listOfBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'AAAAAAAAAAAAAAAAAAA',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f7',
      title: 'BBBBBBBBBBBBBBBB',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
      __v: 0
    }
  ]
    
  const favorite = 
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  
  test('gets a list of blogs and returns a blog with most likes', () => {
    const result = listHelper.favoriteBlog(listOfBlogs)
    expect(result).toEqual(favorite)
  })
})

describe('favorite blog', () => {
  const listOfBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'AAAAAAAAAAAAAAAAAAA',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f7',
      title: 'BBBBBBBBBBBBBBBB',
      author: 'Some other author',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      __v: 0
    }
  ]
  
  test('should return the author with the biggest number of blogs', () => {
    const result = listHelper.mostBlogs(listOfBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 2
    })
  })
})
  
describe('author with most likes', () => {
  const listOfBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Edsger W. Dijkstra',
      author: 'author',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f7',
      title: 'BBBBBBBBBBBBBBBB',
      author: 'Some other author',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
      __v: 0
    }
  ]
    
  test('should return the author with the biggest number of blogs', () => {
    const result = listHelper.mostLikes(listOfBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 8
    })
  })
})
    