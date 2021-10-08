import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import {useQuery, useMutation} from '@apollo/client';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import {GET_ME} from '../utils/queries';
import {REMOVE_BOOK} from '../utils/mutations';
import { deleteBook } from '../utils/API';

const SavedBooks = () => {
  const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
 const [deleteBook, {error, data}] = useMutation(REMOVE_BOOK);
 const query = useQuery(GET_ME, {});
 if(query.loading) {
   setUserData(query.loading)
   return <h2>Loading...</h2>
 }

 const getUserData = async () => {
   try {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
     if (!token) {
       return false;
     }
     const response = query.data.me;
     console.log(response);
     if (!response) {
       throw new Error('Something went wrong!');
     }
     const user = response;
     setUserData(user);
   } catch (err) {
     console.error(err)
   }
 };
 getUserData();

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await deleteBook({
        variables: {
          deleteBookId: bookId
        }
      });

      if (!response.deleteBook) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.deleteBook;
      setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
