import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loader, setLoader] = useState(false)
  //get user blogs
  const getUserBlogs = async () => {
    setLoader(true);
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false)
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  if (loader) {
    return (
      <h1>Loading...</h1>
    )
  }
  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <h1>You Havent Created a blog</h1>
      )}
    </div>
  );
};

export default UserBlogs;
