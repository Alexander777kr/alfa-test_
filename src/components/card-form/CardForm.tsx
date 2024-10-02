import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../store/hooks';
import {
  addCharacter,
  modifyCharacter,
} from '../../store/features/charactersSlice';
import { getRandomInt, showEpisodes } from '../../utils/functions';
import { addCharacterDetailedInfo } from '../../store/features/characterInfoSlice';
import {
  statusOptions,
  speciesOptions,
  genderOptions,
  HEADER_TEXT_LENGTH_VALIDATION,
  ORIGIN_TEXT_LENGTH_VALIDATION,
  LOCATION_TEXT_LENGTH_VALIDATION,
} from '../../utils/constants';
import { CardFormProps } from './CardFormTypes';
import GoBackButton from '../buttons/go-back-button/GoBackButton';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiCharacter = import.meta.env.VITE_API_CHARACTER;
const apiAvatar = import.meta.env.VITE_API_AVATAR;

const imageByDefault = '/19.jpeg';

export default function CardForm({ character, edit }: CardFormProps) {
  const id = character?.id;
  const name = character?.name;
  const episode = character?.episode || [];
  const image = character?.image;
  const status = character?.status;
  const species = character?.species;
  const gender = character?.gender;
  const origin = character?.origin;
  const location = character?.location;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      id: id || getRandomInt(999, 100000),
      name: name || '',
      status: status || '',
      species: species || '',
      gender: gender || '',
      originName: origin?.name || '',
      locationName: location?.name || '',
      image: image || `${baseUrl}${apiCharacter}${apiAvatar}${imageByDefault}`,
      episodes: showEpisodes(episode) || '',
      type: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(
          HEADER_TEXT_LENGTH_VALIDATION,
          `Поле "Имя" не должно превышать ${HEADER_TEXT_LENGTH_VALIDATION} символов`
        )
        .required('Поле обязательно для заполнения'),
      status: Yup.string()
        .test(
          'not-selected',
          'Пожалуйста, выберите значение из списка',
          (value) => value !== 'not_selected'
        )
        .required('Поле обязательно для заполнения'),
      species: Yup.string()
        .test(
          'not-selected',
          'Пожалуйста, выберите значение из списка',
          (value) => value !== 'not_selected'
        )
        .required('Поле обязательно для заполнения'),
      gender: Yup.string()
        .test(
          'not-selected',
          'Пожалуйста, выберите значение из списка',
          (value) => value !== 'not_selected'
        )
        .required('Поле обязательно для заполнения'),
      originName: Yup.string()
        .max(
          ORIGIN_TEXT_LENGTH_VALIDATION,
          `Это поле не должно превышать ${ORIGIN_TEXT_LENGTH_VALIDATION} символов`
        )
        .required('Поле обязательно для заполнения'),
      locationName: Yup.string()
        .max(
          LOCATION_TEXT_LENGTH_VALIDATION,
          `Это поле не должно превышать ${LOCATION_TEXT_LENGTH_VALIDATION} символов`
        )
        .required('Поле обязательно для заполнения'),
      episodes: Yup.string()
        .matches(
          /^(\d+(, )?)*\d$/,
          'Поле должно содержать цифры, разделённые запятыми и пробелами, и заканчиваться цифрой'
        )
        .required('Поле обязательно для заполнения'),
    }),
    onSubmit: (values) => {
      if (edit) {
        dispatch(modifyCharacter(values));
      } else {
        dispatch(addCharacter(values));
      }
      dispatch(addCharacterDetailedInfo(values));
      navigate('/products');
    },
  });

  return (
    <Card maxW="100%">
      <CardBody>
        <Heading as="h1" size="xl" mb={10}>
          {edit ? 'Редактирование персонажа' : 'Новый персонаж'}
        </Heading>
        <Heading as="h4" size="md" mb={10}>
          Заполните поля, все поля являются обязательными
        </Heading>
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            isInvalid={
              (formik.errors.name && formik.touched.name) as boolean | undefined
            }
            mb={5}
          >
            <FormLabel>Имя</FormLabel>
            <Input
              placeholder="Имя персонажа"
              id="name"
              type="text"
              {...formik.getFieldProps('name')}
            />
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={
              (formik.errors.status && formik.touched.status) as
                | boolean
                | undefined
            }
            mb={5}
          >
            <FormLabel>Статус</FormLabel>
            <Select id="status" {...formik.getFieldProps('status')}>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{formik.errors.status}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={
              (formik.errors.species && formik.touched.species) as
                | boolean
                | undefined
            }
            mb={5}
          >
            <FormLabel>Вид</FormLabel>
            <Select id="species" {...formik.getFieldProps('species')}>
              {speciesOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{formik.errors.species}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={
              (formik.errors.gender && formik.touched.gender) as
                | boolean
                | undefined
            }
            mb={5}
          >
            <FormLabel>Пол</FormLabel>
            <Select id="gender" {...formik.getFieldProps('gender')}>
              {genderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{formik.errors.gender}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={
              (formik.errors.originName && formik.touched.originName) as
                | boolean
                | undefined
            }
            mb={5}
          >
            <FormLabel>Место, где был впервые упомянут персонаж</FormLabel>
            <Input
              placeholder="Где впервые упомянут персонаж"
              id="originName"
              type="text"
              {...formik.getFieldProps('originName')}
            />
            <FormErrorMessage>{formik.errors.originName}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={
              (formik.errors.locationName && formik.touched.locationName) as
                | boolean
                | undefined
            }
            mb={5}
          >
            <FormLabel>Место, где в последний раз был персонаж</FormLabel>
            <Input
              placeholder="Где в последний раз упомянут персонаж"
              id="locationName"
              type="text"
              {...formik.getFieldProps('locationName')}
            />
            <FormErrorMessage>{formik.errors.locationName}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={
              (formik.errors.episodes && formik.touched.episodes) as
                | boolean
                | undefined
            }
            mb={5}
          >
            <FormLabel>Эпизоды</FormLabel>
            <Input
              placeholder="Эпизоды (числа) через запятую"
              id="episodes"
              type="text"
              {...formik.getFieldProps('episodes')}
            />
            <FormErrorMessage>{formik.errors.episodes}</FormErrorMessage>
          </FormControl>

          <Input type="hidden" id="image" {...formik.getFieldProps('image')} />
          <Input type="hidden" id="type" {...formik.getFieldProps('type')} />
          <Input type="hidden" id="id" {...formik.getFieldProps('id')} />
          <Button colorScheme="blue" type="submit" mr={5}>
            {edit ? 'Сохранить редактирование' : 'Создать'}
          </Button>
          <GoBackButton />
        </form>
      </CardBody>
    </Card>
  );
}
