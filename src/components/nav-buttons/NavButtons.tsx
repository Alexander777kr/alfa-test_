import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { NavButtonsProps } from './NavButtonsTypes';

export default function NavButtons({
  goToCardFormBtn = true,
}: NavButtonsProps) {
  const navigate = useNavigate();
  const goToCreateProduct = () => {
    navigate('/create-product');
  };

  const goToHomePage = () => {
    navigate('/');
  };
  return (
    <>
      {goToCardFormBtn && (
        <Button mr={10} colorScheme="purple" onClick={goToCreateProduct}>
          Создать персонажа
        </Button>
      )}
      <Button colorScheme="purple" onClick={goToHomePage}>
        На главную
      </Button>
    </>
  );
}
