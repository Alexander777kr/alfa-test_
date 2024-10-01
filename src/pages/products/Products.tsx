import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import ResponsivePagination from 'react-responsive-pagination';
import Card from '../../components/card/Card';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  changeStatusToIdle,
  fetchCharacters,
  selectCharacters,
} from '../../store/features/charactersSlice';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';
import LoadingAndErrorLayout from '../../components/loading-and-error-layout/LoadingAndErrorLayout';
import {
  genderOptions,
  speciesOptions,
  statusOptions,
} from '../../utils/constants';
import HeadingTitle from '../../components/heading-title/HeadingTitle';
import NavButtons from '../../components/nav-buttons/NavButtons';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiCharacter = import.meta.env.VITE_API_CHARACTER;

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const [showCards, setShowCards] = useState('all');
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [searchName, setSearchName] = useState('');
  const [searchStatus, setSearchStatus] = useState('not_selected');
  const [searchSpecies, setSearchSpecies] = useState('not_selected');
  const [searchGender, setSearchGender] = useState('not_selected');

  const dispatch = useAppDispatch();
  const { characters, status, error, pagination } =
    useAppSelector(selectCharacters);

  let filteredCharacters = characters;

  if (searchName !== '') {
    filteredCharacters = filteredCharacters.filter((character) =>
      character.name
        .trim()
        .toLowerCase()
        .includes(searchName.toLowerCase().trim())
    );
  }

  if (searchStatus !== 'not_selected') {
    filteredCharacters = filteredCharacters.filter(
      (character) => character.status === searchStatus
    );
  }

  if (searchSpecies !== 'not_selected') {
    filteredCharacters = filteredCharacters.filter(
      (character) => character.species === searchSpecies
    );
  }

  if (searchGender !== 'not_selected') {
    filteredCharacters = filteredCharacters.filter(
      (character) => character.gender === searchGender
    );
  }

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
      dispatch(
        fetchCharacters(`${baseUrl}${apiCharacter}?page=${currentPage}`)
      );
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

  const handleChangePage = (page: number) => {
    setSearchParams({ page: String(page) });
    dispatch(changeStatusToIdle());
    setCurrentPage(page);
  };

  return (
    <Container maxW="1200px" px={4} py={16}>
      <HeadingTitle />
      <Flex flexDirection="row" alignItems="center" mb={10}>
        <Container maxWidth="1200px" display="flex" justifyContent="center">
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
          <NavButtons />
        </Container>
      </Flex>
      <Flex justifyContent="center" alignItems="center" mt={10} mb={10}>
        <ResponsivePagination
          current={currentPage}
          total={pagination.pages}
          onPageChange={handleChangePage}
        />
      </Flex>
      <Flex flexDirection="row" alignItems="center" mb={10}>
        <Container maxWidth="1200px" display="flex" justifyContent="flex-end">
          <Box as="header" bg="gray.100" width="100%" borderRadius="md" p={4}>
            <Heading as="h2" size="md" mb={4}>
              Фильтры
            </Heading>
            <HStack spacing={4} align="flex-start">
              <FormControl width="35%">
                <FormLabel>Имя персонажа</FormLabel>
                <Input
                  placeholder="Поиск по имени персонажа"
                  onChange={(e) => setSearchName(e.target.value)}
                  value={searchName}
                />
              </FormControl>
              <FormControl width="25%">
                <FormLabel>Статус</FormLabel>
                <Select
                  id="status"
                  name="status"
                  onChange={(e) => setSearchStatus(e.target.value)}
                  value={searchStatus}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl width="25%">
                <FormLabel>Вид</FormLabel>
                <Select
                  id="species"
                  name="species"
                  onChange={(e) => setSearchSpecies(e.target.value)}
                  value={searchSpecies}
                >
                  {speciesOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl width="25%">
                <FormLabel>Пол</FormLabel>
                <Select
                  id="gender"
                  name="gender"
                  onChange={(e) => setSearchGender(e.target.value)}
                  value={searchGender}
                >
                  {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </HStack>
          </Box>
        </Container>
      </Flex>
      {filteredCharacters.length === 0 && showCards === 'favorites' && (
        <Flex justifyContent="center" alignItems="center">
          <Text>Избранное отсутствует</Text>
        </Flex>
      )}
      {filteredCharacters.length === 0 && showCards === 'all' && (
        <Flex justifyContent="center" alignItems="center">
          <Text>Персонажи отсутствуют</Text>
        </Flex>
      )}
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
        <ResponsivePagination
          current={currentPage}
          total={pagination.pages}
          onPageChange={handleChangePage}
        />
      </Flex>
    </Container>
  );
}
