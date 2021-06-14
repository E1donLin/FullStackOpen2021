const blogs = require('./blogsJSON')
const listHelper = require('../utils/list_helper')

describe('Most Likes', () => {
  test('when we have a list of five blogs', () => {
    const result = listHelper.mostLikes(blogs)
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    }
    expect(result).toEqual(expected)
  })
})
