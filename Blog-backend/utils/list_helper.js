const _ = require('lodash')

const dummy = (array) => {
  return 1;
};

const totalLikes = (array) => {
  return array.reduce((sum, a) => {
    return sum + a.likes;
  }, 0);
};

const favoriteBlog = (array) => {
  return array.reduce((mostLike, a) => {
    return a.likes > mostLike.likes ? a : mostLike
  }, array[0])
}

const mostBlogs = (array) => {
  const authorCount = _.countBy(array, 'author')
  const authorWithMostBlogs = _.maxBy(Object.entries(authorCount), ([author, count]) => count)
  return result = { author: authorWithMostBlogs[0], blogs: authorWithMostBlogs[1] }
}

const mostLikes = (array) => {
  const authorLikes = array.reduce((acc, a) => {
    acc[a.author] = (acc[a.author] || 0) + a.likes
    return acc
  }, {})
  const authorWithMostLikes = Object.entries(authorLikes).reduce((max, current) => {
    return current[1] > max[1] ? current : max
  })
  return result = {
    author: authorWithMostLikes[0],
    likes: authorWithMostLikes[1]
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
};
