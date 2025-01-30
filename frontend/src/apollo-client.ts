import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

export const GET_POSTS = gql`
    query GetPosts {
        posts {
            id
            title
            content
            created_at
        }
    }
`;

export const CREATE_POST = gql`
    mutation CreatePost($title: String!, $content: String!) {
        createPost(title: $title, content: $content) {
            id
            title
            content
            created_at
        }
    }
`;

export const DELETE_POST = gql`
    mutation DeletePost($id: Float!) {
        deletePost(id: $id) {
            id
        }
    }
`;

export const UPDATE_POST = gql`
    mutation UpdatePost($id: Int!, $title: String!, $content: String!) {
        updatePost(id: $id, title: $title, content: $content) {
            id
            title
            content
            created_at
        }
    }
`;
