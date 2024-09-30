export function translateStatus(status: string) {
    let statusRus = status;
  if (status === 'Alive') {
    statusRus = 'Живой(-ая)';
  } else if (status === 'Dead') {
    statusRus = 'Не живой(-ая)';
  } else if (status === 'unknown') {
    statusRus = 'Неизвестно';
  }
  return statusRus;
}

export function translateSpecies(species: string) {
    let speciesRus = species;
  if (species === 'Human') {
    speciesRus = 'Человек';
  } else if (species === 'Alien') {
    speciesRus = 'Пришелец';
  } else if (species === 'Animal') {
    speciesRus = 'Животное';
  } else if (species === 'unknown') {
    speciesRus = 'Неизвестно';
  }
  return speciesRus;
}

export function translateGender(gender: string) {
    let genderRus = gender;
  if (gender === 'Female') {
    genderRus = 'Женский';
  } else if (gender === 'Male') {
    genderRus = 'Мужской';
  }  else if (gender === 'unknown') {
    genderRus = 'Неизвестно';
  }
  return genderRus;
}