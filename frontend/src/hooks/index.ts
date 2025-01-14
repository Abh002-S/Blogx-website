import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
  content: string;
  title: string;
  id: number;
  startTime: string; // Renamed from startDate to startTime
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlog({
          ...response.data.blog,
          startTime: response.data.blog.startTime || new Date().toISOString(), // Handle missing startTime gracefully
        });
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
  };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const blogsWithTimes = response.data.blogs.map((blog: any) => ({
          ...blog,
          startTime: blog.startTime || new Date().toISOString(), // Add startTime if missing
        }));
        setBlogs(blogsWithTimes);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};
