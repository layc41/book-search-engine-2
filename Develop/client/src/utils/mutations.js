import gql from 'graphql-tag';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeFriend($bookId: String!) {
    removeFriend(bookId: $bookId) {
      _id
      username
      email
      bookCount 
      savedBooks{
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation removeFriend($bookData: BookInput) {
    removeFriend(bookData: $bookData) {
      _id
      username
      email
      bookCount 
      savedBooks{
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;