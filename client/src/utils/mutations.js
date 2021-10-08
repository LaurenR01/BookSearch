import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser($username: String!, $password: String!)  {loginUser(username: $username, password: $password) {
    Auth{
        token
        user
    }}}`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String, $password: String!)  {loginUser(username: $username, email: $email, password: $password) {
    Auth{
        token
        user
    }}}`;

export const SAVE_BOOK = gql`
mutation saveBook($authors: [String], $description: String, $title : String, $bookId: Int, $image: String, $link: String) {saveBook(authors : $authors, description: $description, title: $title, bookId: $bookId, image: $image, link: $link) {
    User{
        _id
        username
        email
        bookCount
        savedBooks
    }}}`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: Int) {removeBooks(bookId: $bookId) {
        User{
            _id
            username
            email
            bookCount
            savedBooks
        }
    }}`;