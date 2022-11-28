import React, { useState, useEffect } from 'react';
import { getPosts } from '../adapters/FirebaseAdapters';
import RenderPosts from './postComponents/RenderPosts';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts(setPosts);
  }, []);

  return (
    <main className="flex column">
      <RenderPosts posts={posts} />
    </main>
  );
}
