const blogs = require('./blogsJSON')
const listHelper = require('../utils/list_helper')

describe('Most blogs', () => {
  test('when only one blog', () => {
    const blog = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0,
      },
    ]

    const result = listHelper.mostBlogs(blog)
    const expected = {
      author: 'Michael Chan',
      blogs: 1,
    }

    expect(result).toEqual(expected)
  })
  test('when we have a list of five blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    const expected = {
      author: 'Robert C. Martin',
      blogs: 3,
    }
    expect(result).toEqual(expected)
  })
})
