import { Container, Flex } from '@chakra-ui/react';
import CardDetailedInfo from '../../components/card-detailed-info/CardDetailedInfo';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchCharacterInfo,
  selectCharacter,
} from '../../store/features/characterInfoSlice';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import LoadingAndErrorLayout from '../../components/loading-and-error-layout/LoadingAndErrorLayout';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';

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
    <Flex minWidth="1000px" minH="100vh" alignItems="center">
      <Container display="flex" justifyContent="center" alignItems="center">
        <CardDetailedInfo character={characterInfo} />
      </Container>
    </Flex>
  );
}
