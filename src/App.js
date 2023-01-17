import React from 'react'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import ProductPage from './containers/ProductPage';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));


const App = () => {

  return (
    <>
      <Provider store={store}>
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="xl">
            <ProductPage />
          </Container>
        </React.Fragment>
      </Provider >
    </>
  );
};

export default App;

