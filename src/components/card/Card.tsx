import {
  Button,
  Card as ChakraCard,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  Container,
} from '@chakra-ui/react';
import { AiFillDelete } from 'react-icons/ai';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { CardTypes } from './CardTypes';
import { truncateText } from '../../utils/functions';
import { ORIGIN_TEXT_LENGTH } from '../../utils/constants';
import {
  deleteCharacterById,
  likeCharacter,
} from '../../store/features/charactersSlice';
import { useAppDispatch } from '../../store/hooks';

export default function Card({
  id,
  image,
  name,
  origin,
  location,
  like,
}: CardTypes) {
  const dispatch = useAppDispatch();

  const deleteItemHandler = (id: number) => {
    dispatch(deleteCharacterById(id));
  };

  const likeItemHandler = (id: number) => {
    dispatch(likeCharacter(id));
  };

  return (
    <Container
      maxWidth="1200px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <ChakraCard maxW="sm">
        <CardBody>
          <Image
            src={image}
            alt="Green double couch with wooden legs"
            objectFit="cover"
            width="100%"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{truncateText(name)}</Heading>
            <Text>
              Откуда родом:{' '}
              {origin === 'unknown'
                ? truncateText('Неизвестно')
                : truncateText(origin, ORIGIN_TEXT_LENGTH)}
            </Text>
            <Text color="blue.600">
              Находится:{' '}
              {location === 'unknown'
                ? truncateText('Неизвестно')
                : truncateText(location)}
            </Text>
          </Stack>
        </CardBody>
        <CardFooter justify="space-between" flexWrap="wrap">
          <Button
            flex="1"
            onClick={() => likeItemHandler(id)}
            colorScheme={like ? 'teal' : 'gray'}
            variant={like ? 'solid' : 'ghost'}
            leftIcon={<BsFillSuitHeartFill />}
          />
          <Button
            onClick={() => deleteItemHandler(id)}
            flex="1"
            variant="ghost"
            leftIcon={<AiFillDelete />}
          />
        </CardFooter>
      </ChakraCard>
    </Container>
  );
}
