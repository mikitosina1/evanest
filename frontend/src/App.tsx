import { useQuery, useMutation } from "@apollo/client";
import { client, GET_POSTS, CREATE_POST, DELETE_POST, UPDATE_POST } from "./apollo-client";
import { useState } from "react";

function App() {
  const { loading, error, data, refetch } = useQuery(GET_POSTS, { client });

  const [createPost] = useMutation(CREATE_POST, { onCompleted: () => refetch() });
  const [deletePost] = useMutation(DELETE_POST, { onCompleted: () => refetch() });
  const [updatePost] = useMutation(UPDATE_POST, { onCompleted: () => refetch() });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingContent, setEditingContent] = useState("");

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    await createPost({
      variables: {
        input: {
          title,
          content
        }
      }
    });
    setTitle("");
    setContent("");
  };

  const handleDeletePost = async (id: number) => {
    await deletePost({ variables: { id } });
  };

  const handleEditPost = (post: { id: number; title: string; content: string }) => {
    setEditingPostId(post.id);
    setEditingTitle(post.title);
    setEditingContent(post.content);
  };

  const handleUpdatePost = async () => {
    if (editingPostId && editingTitle && editingContent) {
      await updatePost({
        variables: {
          input: {
            id: editingPostId,
            title: editingTitle,
            content: editingContent
          }
        }
      });
      setEditingPostId(null);
      setEditingTitle("");
      setEditingContent("");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <h3 className="title">Posts</h3>
      <form onSubmit={handleCreatePost} className="post-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="textarea"
        />
        <button type="submit" className="button">Create Post</button>
      </form>

      {data.posts.map((post) => (
        <div key={post.id} className="post-card">
          <div className="title-handler">
            {editingPostId === post.id ? (
              <>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="input"
                />
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  className="textarea"
                />
                <button onClick={handleUpdatePost} className="button">Save</button>
                <button onClick={() => setEditingPostId(null)} className="button">Cancel</button>
              </>
            ) : (
              <>
                <h2 className="post-title">{post.title}</h2>
                <small className="post-date">{new Date(post.created_at).toLocaleString()}</small>
                <button onClick={() => handleEditPost(post)} className="edit-button">Edit</button>
                <button onClick={() => handleDeletePost(post.id)} className="delete-button">Delete</button>
              </>
            )}
          </div>
          <p className="post-content">{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
