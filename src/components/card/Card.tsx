import { Link } from 'react-router-dom';
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
import { CardProps } from './CardTypes';
import { truncateText } from '../../utils/functions';
import {
  HEADER_TEXT_LENGTH,
  LOCATION_TEXT_LENGTH,
  ORIGIN_TEXT_LENGTH,
} from '../../utils/constants';
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
}: CardProps) {
  const dispatch = useAppDispatch();

  const deleteItemHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    event.preventDefault();
    dispatch(deleteCharacterById(id));
  };

  const likeItemHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    event.preventDefault();
    dispatch(likeCharacter(id));
  };

  return (
    <Container
      maxWidth="1200px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Link to={`/products/${id}`}>
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
              <Heading size="md">
                {truncateText(name, HEADER_TEXT_LENGTH)}
              </Heading>
              <Text>
                Первая серия:{' '}
                {origin === 'unknown'
                  ? truncateText('Неизвестно', ORIGIN_TEXT_LENGTH)
                  : truncateText(origin, ORIGIN_TEXT_LENGTH)}
              </Text>
              <Text color="blue.600">
                Последняя:{' '}
                {location === 'unknown'
                  ? truncateText('Неизвестно', LOCATION_TEXT_LENGTH)
                  : truncateText(location, LOCATION_TEXT_LENGTH)}
              </Text>
            </Stack>
          </CardBody>
          <CardFooter justify="space-between" flexWrap="wrap">
            <Button
              flex="1"
              onClick={(event) => likeItemHandler(event, id)}
              colorScheme={like ? 'teal' : 'gray'}
              variant={like ? 'solid' : 'ghost'}
              leftIcon={<BsFillSuitHeartFill />}
            />
            <Button
              onClick={(event) => deleteItemHandler(event, id)}
              flex="1"
              variant="ghost"
              leftIcon={<AiFillDelete />}
            />
          </CardFooter>
        </ChakraCard>
      </Link>
    </Container>
  );
}
