import { HelmetProvider } from "react-helmet-async";
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { store } from '../../store/store';
import { AuthInitializer } from '../domain/auth/AuthInitializer';
import Main from "./Main";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { auth } from '../../lib/firebase';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:3000/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  // Get the user ID directly
  const userId = auth.currentUser?.uid;
  return {
    headers: {
      ...headers,
      authorization: userId ? `Bearer ${userId}` : "",
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <AuthInitializer>
              <Main />
            </AuthInitializer>
          </BrowserRouter>
        </HelmetProvider>
      </Provider>
    </ApolloProvider>
  );
};


