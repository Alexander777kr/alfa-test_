import { Container, Grid } from '@chakra-ui/react';
import Card from '../../components/card/Card';

export default function Products() {
  return (
    <Container maxW="1200px" px={4} py={16}>
      <Grid templateColumns="repeat(3, minmax(250px, 1fr))" gap={6}>
        <Card />
        <Card />
        <Card />
        <Card />
      </Grid>
    </Container>
  );
}
