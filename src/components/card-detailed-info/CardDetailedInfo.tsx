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

export default function CardDetailedInfo({ character }: CardDetailedInfoProps) {
  const { name, episode, image, status, species, gender, origin, location } =
    character;
  let statusRus = status;
  if (status === 'Alive') {
    statusRus = 'Живой(-ая)';
  } else if (status === 'Dead') {
    statusRus = 'Не живой(-ая)';
  } else if (status === 'Unknown') {
    statusRus = 'Неизвестно';
  }

  let speciesRus = species;
  if (species === 'Human') {
    speciesRus = 'Человек';
  } else if (species === 'Alien') {
    speciesRus = 'Пришелец';
  } else if (species === 'Animal') {
    speciesRus = 'Животное';
  }

  let genderRus = gender;
  if (gender === 'Female') {
    genderRus = 'Женский';
  } else if (gender === 'Male') {
    genderRus = 'Мужской';
  }
  return (
    <Card maxW="100%">
      <CardBody>
        <Image
          width="100%"
          height="300px"
          objectFit="cover"
          src={image}
          alt={name}
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{name}</Heading>
          <Text>Статус: {statusRus}</Text>
          <Text>Вид: {speciesRus}</Text>
          <Text>Пол: {genderRus}</Text>
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
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
