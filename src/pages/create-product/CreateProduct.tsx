import { Container, Flex } from '@chakra-ui/react';
import CardForm from '../../components/card-form/CardForm';

export default function CreateProduct() {
  return (
    <Flex minWidth="1000px" minH="100vh" alignItems="center">
      <Container display="flex" justifyContent="center" alignItems="center">
        <CardForm />
      </Container>
    </Flex>
  );
}
