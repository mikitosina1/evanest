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
    mutation CreatePost($input: CreatePostInput!) {
        createPost(input: $input) {
            id
            title
            content
            created_at
        }
    }
`;

export const DELETE_POST = gql`
    mutation DeletePost($input: DeletePostInput!) {
        deletePost(input: $input)
    }
`;

export const UPDATE_POST = gql`
    mutation UpdatePost($input: UpdatePostInput!) {
        updatePost(input: $input) {
            id
            title
            content
            created_at
        }
    }
`;
