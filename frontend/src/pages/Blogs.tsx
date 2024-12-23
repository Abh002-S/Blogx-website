import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import { useState, useEffect } from "react";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  const [blogDates, setBlogDates] = useState<{ [key: number]: Date }>({});

  // Set current date for blogs if not already set
  useEffect(() => {
    if (!loading && blogs.length > 0) {
      const dates = blogs.reduce((acc, blog) => {
        if (!blogDates[blog.id]) {
          acc[blog.id] = new Date(); // Assign current date
        } else {
          acc[blog.id] = blogDates[blog.id]; // Preserve existing date
        }
        return acc;
      }, {} as { [key: number]: Date });
      setBlogDates((prevDates) => ({ ...prevDates, ...dates }));
    }
  }, [loading, blogs]);

  if (loading) {
    return (
      <div>
        <Appbar authorName="Loading..." />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }
  const firstBlogAuthorName =
    blogs.length > 0 ? blogs[0].author.name : "Anonymous";

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  return (
    <div>
      <Appbar authorName={firstBlogAuthorName} />
      <div className="flex justify-center">
        <div>
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={formatDate(blogDates[blog.id] || new Date())}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
