
import { gql } from '@apollo/client';

export const GET_BOOK_DATA = gql`
  query{
  book{
        author

        title
    pages{
            content
            pageIndex
      tokens{
                position
                value
            }
        }

    }
}
  
`
