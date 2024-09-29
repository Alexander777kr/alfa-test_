import { ErrorProps } from './ErrorTypes';

export default function Error({ error }: ErrorProps) {
  return (
    <div>
      Произошла ошибка запроса данных, обратитесь к администратору. Ошибка:{' '}
      {error}
    </div>
  );
}
