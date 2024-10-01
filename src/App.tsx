import { extendTheme, ChakraProvider } from '@chakra-ui/react';
import Router from './router/Router';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { GoToTop } from 'go-to-top-react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        minHeight: '100vh',
      },
    },
  },
});

function App() {
  return (
    <>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Router />
        </ChakraProvider>
      </Provider>
      <GoToTop />
    </>
  );
}

export default App;
