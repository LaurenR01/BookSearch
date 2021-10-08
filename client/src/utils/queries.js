import {gql} from '@apollo/client';

export const GET_ME = gql`
query getMe {
    User {
        _id
        username
        email
        bookCount
        SavedBooks
    }
}
`;