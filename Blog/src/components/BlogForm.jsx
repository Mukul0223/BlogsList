import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const createObject = (e) => {
    e.preventDefault();

    const newObject = {
      author: author,
      title: title,
      url: url,
      likes: Number(likes) || 0,
    };
    if (newObject.author && newObject.title && newObject.url) {
      createBlog(newObject);
      setAuthor("");
      setTitle("");
      setUrl("");
      setLikes("");
    } else {
      setErrorMessage("Missing values!");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
  };

  const handleAuthor = (e) => {
    setAuthor(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleLikes = (e) => {
    setLikes(e.target.value);
  };

  return (
    <div>
      <form onSubmit={createObject}>
        <input
          type="text"
          value={author}
          placeholder="author"
          onChange={handleAuthor}
        />
        <input
          type="text"
          value={title}
          placeholder="title"
          onChange={handleTitle}
        />
        <input
          type="url"
          value={url}
          placeholder="url"
          onChange={handleUrl}
        />
        <input
          type="number"
          value={likes}
          placeholder="likes"
          onChange={handleLikes}
        />
        <button type="submit">Save</button>
      </form>
      {errorMessage ? <>{errorMessage}</> : <></>}
    </div>
  );
};

export default BlogForm;
