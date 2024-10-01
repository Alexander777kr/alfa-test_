import {
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import {
  fetchCharacters,
  selectCharacters,
} from '../../store/features/charactersSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import LoadingAndErrorLayout from '../../components/loading-and-error-layout/LoadingAndErrorLayout';

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(selectCharacters);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(
        fetchCharacters('https://rickandmortyapi.com/api/character?page=1')
      ); // Вызываем thunk для загрузки данных
    }
  }, [status, dispatch]);

  const goToProductsPage = () => {
    navigate('/products'); // Заменить на нужный путь
  };

  const goToCreateProduct = () => {
    navigate('/create-product'); // Заменить на нужный путь
  };

  if (status === 'loading') {
    return (
      <LoadingAndErrorLayout>
        <Loading />
      </LoadingAndErrorLayout>
    );
  }

  if (status === 'failed') {
    return (
      <LoadingAndErrorLayout>
        <Error error={error} />
      </LoadingAndErrorLayout>
    );
  }

  return (
    <Flex minWidth="1000px" minH="100vh" alignItems="center">
      <Container>
        <Flex
          minWidth="inherit"
          justifyContent="center"
          alignItems="center"
          mb="20px"
        >
          <Image
            width="calc(100% + 24px)"
            height="300px"
            objectFit="cover"
            src={logo}
            alt="Rick & Morti logo"
          />
        </Flex>
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={6}
          alignItems="center"
          h="45"
        >
          <GridItem w="100%">
            <Button w="100%" colorScheme="green" onClick={goToProductsPage}>
              Персонажи "Рик и Морти"
            </Button>
          </GridItem>
          <GridItem w="100%">
            <Button w="100%" colorScheme="purple" onClick={goToCreateProduct}>
              Создать персонажа
            </Button>
          </GridItem>
        </Grid>
      </Container>
    </Flex>
  );
}
