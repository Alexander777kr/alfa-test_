import { Box, Button, Container, Flex, Grid, Heading } from '@chakra-ui/react';
import Card from '../../components/card/Card';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  changeStatusToIdle,
  fetchCharacters,
  selectCharacters,
} from '../../store/features/charactersSlice';
import Error from '../../components/error/Error';
import { useEffect, useState } from 'react';
import Loading from '../../components/loading/Loading';
import LoadingAndErrorLayout from '../../components/loading-and-error-layout/LoadingAndErrorLayout';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const [showCards, setShowCards] = useState('all');
  const [currentPage, setCurrentPage] = useState<string | null>(
    'https://rickandmortyapi.com/api/character?page=1'
  );

  console.log(currentPage);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { characters, status, error, pagination } =
    useAppSelector(selectCharacters);

  let filteredCharacters = characters;

  if (showCards === 'favorites') {
    filteredCharacters = filteredCharacters.filter(
      (character) => character.like === true
    );
  }

  const changeCardsHandler = (status: string) => {
    if (status === 'fav') {
      setShowCards('favorites');
    } else {
      setShowCards('all');
    }
  };

  useEffect(() => {
    if (status === 'idle' && currentPage) {
      dispatch(fetchCharacters(currentPage));
    }
  }, [status, dispatch, currentPage]);

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

  const goToCreateProduct = () => {
    navigate('/create-product');
  };

  const goToHomePage = () => {
    navigate('/');
  };

  const handleNextPage = () => {
    if (pagination.next) {
      setCurrentPage(pagination.next);
      dispatch(changeStatusToIdle());
    }
  };

  const handlePrevPage = () => {
    if (pagination.prev) {
      setCurrentPage(pagination.prev);
      dispatch(changeStatusToIdle());
    }
  };

  return (
    <Container maxW="1200px" px={4} py={16}>
      <Heading as="h1" size="xl" textAlign="center" mb={10}>
        Персонажи мультфильма "Рик и Морти"
      </Heading>
      <Flex flexDirection="row" alignItems="center" mb={10}>
        <Container maxWidth="1200px" display="flex" justifyContent="flex-end">
          <Button
            onClick={() => changeCardsHandler('all')}
            colorScheme="blue"
            mr={10}
          >
            Все карточки
          </Button>
          <Button
            onClick={() => changeCardsHandler('fav')}
            colorScheme="purple"
            mr={10}
          >
            Только избранное
          </Button>
          <Button mr={10} colorScheme="purple" onClick={goToCreateProduct}>
            Создать персонажа
          </Button>
          <Button colorScheme="purple" onClick={goToHomePage}>
            На главную
          </Button>
        </Container>
      </Flex>
      <Grid
        templateColumns={{
          md: 'repeat(1, 1fr)',
          lg: 'repeat(3, minmax(250px, 1fr))',
        }}
        gap={6}
      >
        {filteredCharacters.map((character) => (
          <Card
            key={character.id}
            id={character.id}
            image={character.image}
            name={character.name}
            origin={character?.origin?.name}
            location={character?.location?.name}
            like={character.like}
          />
        ))}
      </Grid>
      <Flex justifyContent="center" alignItems="center" mt={10}>
        <Box
          as="button"
          mr={5}
          onClick={handlePrevPage}
          disabled={!pagination.prev}
          _disabled={{ color: 'gray' }}
        >
          Предыдущая страница
        </Box>
        <Box
          as="button"
          onClick={handleNextPage}
          disabled={!pagination.next}
          _disabled={{ color: 'gray' }}
        >
          Следующая страница
        </Box>
      </Flex>
    </Container>
  );
}
