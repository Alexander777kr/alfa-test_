import { extendTheme, ChakraProvider } from '@chakra-ui/react';
import Router from './router/Router';

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
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  );
}

export default App;
