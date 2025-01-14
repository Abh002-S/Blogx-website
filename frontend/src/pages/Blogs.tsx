import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import { useState, useEffect } from "react";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  const [blogTimes, setBlogTimes] = useState<{ [key: number]: string }>({}); // Changed type to store as string

  // Set startTime for blogs if not already set
  useEffect(() => {
    if (!loading && blogs.length > 0) {
      const times = blogs.reduce((acc, blog) => {
        if (!blogTimes[blog.id]) {
          acc[blog.id] = blog.startTime; // Use startTime from blog data
        } else {
          acc[blog.id] = blogTimes[blog.id]; // Preserve existing time
        }
        return acc;
      }, {} as { [key: number]: string });
      setBlogTimes((prevTimes) => ({ ...prevTimes, ...times }));
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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
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
              key={blog.id}
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              startTime={formatTime(
                blogTimes[blog.id] || new Date().toISOString()
              )} // Updated to use startTime
            />
          ))}
        </div>
      </div>
    </div>
  );
};
