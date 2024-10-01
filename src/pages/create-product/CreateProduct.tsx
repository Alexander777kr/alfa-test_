import { Container, Flex } from '@chakra-ui/react';
import CardForm from '../../components/card-form/CardForm';
import HeadingTitle from '../../components/heading-title/HeadingTitle';
import NavButtons from '../../components/nav-buttons/NavButtons';

export default function CreateProduct() {
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
          <NavButtons goToCardFormBtn={false} />
        </Container>
        <Container display="flex" justifyContent="center" alignItems="center">
          <CardForm />
        </Container>
      </Flex>
    </Container>
  );
}
