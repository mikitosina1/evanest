import { useQuery } from "@apollo/client";
import { client, GET_POSTS } from "./apollo-client";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

function App() {
  const { loading, error, data } = useQuery(GET_POSTS, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data.posts.map((post: { id: Key | null | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; content: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; created_at: string | number | Date; }) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <small>{new Date(post.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
