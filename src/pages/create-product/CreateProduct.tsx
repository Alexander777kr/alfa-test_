import { Container, Flex } from '@chakra-ui/react';
import CardDetailedInfo from '../../components/card-detailed-info/CardDetailedInfo';
import CardForm from '../../components/card-form/CardForm';

export default function CreateProduct() {
  return (
    <Flex minWidth="1000px" minH="100vh" alignItems="center">
      <Container display="flex" justifyContent="center" alignItems="center">
        {/* <CardDetailedInfo character={characterInfo} /> */}
        <CardForm />
      </Container>
    </Flex>
  );
}
