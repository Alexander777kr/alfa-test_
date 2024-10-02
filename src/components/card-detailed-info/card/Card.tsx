import {
  Button,
  ButtonGroup,
  Card as ChakraCard,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { showEpisodes } from '../../../utils/functions';
import {
  translateGender,
  translateSpecies,
  translateStatus,
} from '../../../translates/functions';
import GoBackButton from '../../buttons/go-back-button/GoBackButton';
import { CardProps } from './CardTypes';
import { IoIosCreate } from 'react-icons/io';

export default function Card({ character, setEditCard }: CardProps) {
  const { name, episode, image, status, species, gender, origin, location } =
    character;
  return (
    <ChakraCard maxW="100%">
      <CardBody>
        <Image
          width="100%"
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
            <Text>
              Впервые показано в:{' '}
              {origin.name === 'unknown' ? 'Неизвестно' : origin.name}
            </Text>
          )}
          {location !== undefined && (
            <Text>
              Последнее известное местонахождение:{' '}
              {location.name === 'unknown' ? 'Неизвестно' : location.name}
            </Text>
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
            leftIcon={<IoIosCreate />}
            colorScheme="orange"
            mr={5}
            onClick={() => setEditCard(true)}
          >
            Редактировать
          </Button>
          <GoBackButton />
        </ButtonGroup>
      </CardFooter>
    </ChakraCard>
  );
}
