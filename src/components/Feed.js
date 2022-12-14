import React, { useContext, useEffect } from "react";
import { getPosts } from "../adapters/FirebaseAdapters";
import { UserContext } from "../context/UserContext";
import RenderPosts from "./postComponents/RenderPosts";
import CreatePost from "./postComponents/CreatePost";

export default function Feed() {
  const { posts, setPosts } = useContext(UserContext);

  useEffect(() => {
    getPosts(setPosts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex column pad-mid width-80">
      <CreatePost />
      <br />
      <RenderPosts posts={posts} />
    </main>
  );
}
