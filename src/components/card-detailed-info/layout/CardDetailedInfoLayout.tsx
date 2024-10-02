import { useState } from 'react';
import Card from '../card/Card';
import { CardDetailedInfoProps } from './CardDetailedInfoLayoutTypes';
import CardForm from '../../card-form/CardForm';

export default function CardDetailedInfoLayout({
  character,
}: CardDetailedInfoProps) {
  const [editCard, setEditCard] = useState(false);
  return editCard ? (
    <CardForm character={character} edit={true} />
  ) : (
    <Card character={character} setEditCard={setEditCard} />
  );
}
