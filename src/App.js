import './App.css';
import { GET_BOOK_DATA } from './graphql/Queries';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';

import Book from './component/Book';



function App() {

  const client = new ApolloClient({
    uri: 'https://fullstack-engineer-test-n4ouilzfna-uc.a.run.app/graphql',
    cache: new InMemoryCache()

  })

  client.query({ query: GET_BOOK_DATA }).then((res) => console.log(res)).catch((error) => console.log('error:', error))

  return (
    <ApolloProvider client={client}>
      <div className="App">


        <Book />
      </div>

    </ApolloProvider>
  );
}

export default App;
