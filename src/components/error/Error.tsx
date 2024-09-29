import { ErrorTypes } from './ErrorTypes';

export default function Error({ error }: ErrorTypes) {
  return (
    <div>
      Произошла ошибка запроса данных, обратитесь к администратору. Ошибка:{' '}
      {error}
    </div>
  );
}
