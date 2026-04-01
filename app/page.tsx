"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center mt-10">No posts available</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-5">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-700">{post.body}</p>
            <Image
              src={"https://loremflickr.com/320/240?random=" + post.id}
              alt="Random"
              width={320}
              height={240}
              className="mt-3"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}