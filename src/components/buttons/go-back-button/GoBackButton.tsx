import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';

export default function GoBackButton() {
  const navigate = useNavigate();

  const navigateToProducts = () => {
    navigate(-1);
  };

  return (
    <Button
      leftIcon={<IoIosArrowRoundBack />}
      onClick={navigateToProducts}
      variant="solid"
      colorScheme="gray"
    >
      Назад
    </Button>
  );
}
