import { Heading } from '@chakra-ui/react';
import Spinner from '../spinner/Spinner';

export default function Loading() {
  return (
    <div>
      <Heading as="h2" size="md">
        Подождите, идет загрузка данных
      </Heading>
      <Spinner />
    </div>
  );
}
