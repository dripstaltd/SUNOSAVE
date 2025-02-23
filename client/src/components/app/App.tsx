import { HelmetProvider } from "react-helmet-async";
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { store } from '../../store/store';
import { AuthInitializer } from '../domain/auth/AuthInitializer';
import Main from "./Main";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:3000/graphql',
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


