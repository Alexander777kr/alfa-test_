import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Flex } from '@chakra-ui/react';
import CardDetailedInfoLayout from '../../components/card-detailed-info/layout/CardDetailedInfoLayout';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchCharacterInfo,
  selectCharacter,
} from '../../store/features/characterInfoSlice';
import LoadingAndErrorLayout from '../../components/loading-and-error-layout/LoadingAndErrorLayout';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import HeadingTitle from '../../components/heading-title/HeadingTitle';
import NavButtons from '../../components/buttons/nav-buttons/NavButtons';

export default function ProductInfo() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { characterInfo, status, error } = useAppSelector(selectCharacter);

  useEffect(() => {
    if (id !== undefined) {
      if (characterInfo.id !== parseInt(id, 10)) {
        dispatch(fetchCharacterInfo(id));
      }
    }
  }, [dispatch, id, characterInfo.id]);

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
      <Flex
        minWidth="1000px"
        flexDirection="column"
        minH="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <HeadingTitle />

        <Container
          maxWidth="1200px"
          display="flex"
          justifyContent="center"
          mb={10}
        >
          <NavButtons />
        </Container>

        <Container display="flex" justifyContent="center" alignItems="center">
          <CardDetailedInfoLayout character={characterInfo} />
        </Container>
      </Flex>
    </Container>
  );
}
