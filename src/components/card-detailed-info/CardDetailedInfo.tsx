import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { CardDetailedInfoProps } from './CardDetailedInfoTypes';
import { showEpisodes } from '../../utils/functions';
import {
  translateGender,
  translateSpecies,
  translateStatus,
} from '../../translates/functions';
import { useNavigate } from 'react-router-dom';

export default function CardDetailedInfo({ character }: CardDetailedInfoProps) {
  const { name, episode, image, status, species, gender, origin, location } =
    character;

  const navigate = useNavigate();

  const navigateToProducts = () => {
    navigate(-1);
  };

  return (
    <Card maxW="100%">
      <CardBody>
        <Image
          width="100%"
          height="200px"
          objectFit="cover"
          src={image}
          alt={name}
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{name}</Heading>
          <Text>Статус: {translateStatus(status)}</Text>
          <Text>Вид: {translateSpecies(species)}</Text>
          <Text>Пол: {translateGender(gender)}</Text>
          {origin !== undefined && (
            <Text>Впервые показано в: {origin.name}</Text>
          )}
          {location !== undefined && (
            <Text>Последнее известное местонахождение: {location.name}</Text>
          )}
          {episode !== undefined && (
            <Text color="blue.600" fontSize="2xl">
              Снимался(-лась) в эпизодах под номером: {showEpisodes(episode)}
            </Text>
          )}
        </Stack>
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            onClick={navigateToProducts}
            variant="solid"
            colorScheme="blue"
          >
            Назад
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
