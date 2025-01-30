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
