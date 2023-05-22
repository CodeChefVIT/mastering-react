import { useState, useEffect } from "react";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";

// eslint-disable-next-line react/prop-types
const Post = ({ userId, title, body }) => {
  const avatar = createAvatar(adventurer, {
    seed: userId,
    size: 256,
    backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"],
  }).toDataUriSync();

  return (
    <div className="flex flex-col m-5 justify-center gap-5 text-black bg-white p-5 rounded-lg">
      <div className="flex flex-row items-center gap-5">
        <img src={avatar} alt="avatar" className="w-20 h-20 rounded-full" />
        <h1 className="text-2xl">{title}</h1>
      </div>
      <div>
        <p className="text-xl">{body}</p>
      </div>
    </div>
  );
};

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setPosts(data);
      console.log(data);
    }

    fetchPosts();
  }, []);

  return (
    <div className="bg-gray-700 text-gray-50">
      <div className="p-10">
        {posts.map((post) => (
          <Post
            key={post.id}
            userId={post.userId}
            title={post.title}
            body={post.body}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
