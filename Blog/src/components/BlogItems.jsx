const BlogItems = ({ blogs, handleLikes, handleDelete }) => {
  return (
    <ul>
      {blogs.map((blog) => {
        return (
          <li key={blog.id}>
            {blog.id}|| Author: {blog.author} || Title: {blog.title} || Url: {blog.url} || Likes: {blog.likes}{' '}
            <button type="button" onClick={() => handleLikes(blog.id)}>Upvote</button>
            <button type="button" onClick={() => handleDelete(blog.id)}>Delete</button>
          </li>
      )
    })}
    </ul>
  )
};

export default BlogItems;
