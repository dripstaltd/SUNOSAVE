import { HelmetProvider } from "react-helmet-async";
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { store } from '../../store/store';
import { AuthInitializer } from '../domain/auth/AuthInitializer';
import Main from "./Main";

export const App = () => {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <AuthInitializer>
            <Main />
          </AuthInitializer>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
};


