import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function GoBackButton() {
  const navigate = useNavigate();

  const navigateToProducts = () => {
    navigate(-1);
  };

  return (
    <Button onClick={navigateToProducts} variant="solid" colorScheme="blue">
      Назад
    </Button>
  );
}
