import { Button, Container, Flex, Grid, Heading } from '@chakra-ui/react';
import Card from '../../components/card/Card';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchCharacters,
  selectCharacters,
} from '../../store/features/charactersSlice';
import Error from '../../components/error/Error';
import { useEffect, useState } from 'react';
import Loading from '../../components/loading/Loading';
import LoadingAndErrorLayout from '../../components/loading-and-error-layout/LoadingAndErrorLayout';

export default function Products() {
  const [showCards, setShowCards] = useState('all');

  const dispatch = useAppDispatch();
  const { characters, status, error } = useAppSelector(selectCharacters);

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
    if (status === 'idle') {
      dispatch(fetchCharacters());
    }
  }, [status, dispatch]);

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
          >
            Только избранное
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
            origin={character.origin.name}
            location={character.location.name}
            like={character.like}
          />
        ))}
      </Grid>
    </Container>
  );
}
