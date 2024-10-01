import { Button, Text } from '@chakra-ui/react';
import { ErrorProps } from './ErrorTypes';
import { useNavigate } from 'react-router-dom';

export default function Error({ error }: ErrorProps) {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate(-1)}>Назад</Button>
      <Text>
        Произошла ошибка запроса данных, обратитесь к администратору. Ошибка:{' '}
        {error}
      </Text>
    </div>
  );
}
