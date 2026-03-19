import { useState, useEffect } from "react";
import BlogForm from "./components/BlogForm";
import BlogItems from "./components/BlogItems";
import blogService from "./services/blog";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService
      .getAll()
      .then((data) => {
        console.log(data);
        setBlogs(data);
      })
      .catch((error) => {
        console.error("Failed to fetch blog", error);
      });
  }, []);

  const createBlog = (newObject) => {
    const newBlog = {
      ...newObject,
    };
    blogService
      .create(newBlog)
      .then((data) => setBlogs((blogs) => blogs.concat(data)));
  };
  console.log(blogs);

  const handleLikes = (id) => {
    const blog = blogs.find((b) => b.id === id);
    const updateLike = {
      ...blog,
      likes: blog.likes + 1,
    };
    blogService.update(id, updateLike).then((data) => {
      setBlogs((blogs) => blogs.map((b) => (b.id !== id ? b : data)));
    });
  };

  const handleDelete = (id) => {
    blogService
      .remove(id)
      .then(() => setBlogs((blogs) => blogs.filter((b) => b.id !== id)));
  };

  return (
    <div>
      <h1>Hello</h1>
      <BlogForm createBlog={createBlog} />
      <BlogItems
        blogs={blogs}
        handleLikes={handleLikes}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
