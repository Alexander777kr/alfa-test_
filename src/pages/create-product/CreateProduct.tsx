import { Container, Flex } from '@chakra-ui/react';
import CardForm from '../../components/card-form/CardForm';
import HeadingTitle from '../../components/heading-title/HeadingTitle';
import NavButtons from '../../components/nav-buttons/NavButtons';

export default function CreateProduct() {
  return (
    <Container maxW="1200px" px={4} py={16}>
      <HeadingTitle />
      <Flex flexDirection="row" alignItems="center" mb={10}>
        <Container maxWidth="1200px" display="flex" justifyContent="center">
          <NavButtons goToCardFormBtn={false} />
        </Container>
      </Flex>
      <Flex minWidth="1000px" minH="100vh" alignItems="center">
        <Container display="flex" justifyContent="center" alignItems="center">
          <CardForm />
        </Container>
      </Flex>
    </Container>
  );
}
