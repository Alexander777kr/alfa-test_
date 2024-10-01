import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Flex } from '@chakra-ui/react';
import CardDetailedInfo from '../../components/card-detailed-info/CardDetailedInfo';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchCharacterInfo,
  selectCharacter,
} from '../../store/features/characterInfoSlice';
import LoadingAndErrorLayout from '../../components/loading-and-error-layout/LoadingAndErrorLayout';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import HeadingTitle from '../../components/heading-title/HeadingTitle';
import NavButtons from '../../components/nav-buttons/NavButtons';

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
      <HeadingTitle />
      <Flex flexDirection="row" alignItems="center" mb={10}>
        <Container maxWidth="1200px" display="flex" justifyContent="center">
          <NavButtons />
        </Container>
      </Flex>
      <Flex minWidth="1000px" minH="100vh" alignItems="center">
        <Container display="flex" justifyContent="center" alignItems="center">
          <CardDetailedInfo character={characterInfo} />
        </Container>
      </Flex>
    </Container>
  );
}
