const blogs = require('./blogsJSON')
const listHelper = require('../utils/list_helper')

describe('Favorite Blog', () => {
  test('Canonical string reduction had the most number of likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    const expected = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }
    expect(result).toEqual(expected)
  })
})
