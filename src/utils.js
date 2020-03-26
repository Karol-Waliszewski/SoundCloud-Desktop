export const shuffleArray = (array, from = 0) => {
  let i = from,
    temp,
    j;

  // Prevent mutation
  array = [...array];

  // While there remain elements to shuffle…
  while (i !== array.length - 1) {
    // Pick a remaining element…
    j = Math.floor(Math.random() * Math.abs(array.length - i) + from);
    i++;

    // And swap it with the current element.
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

export const deleteCopies = array => {
  let ids = [...new Set(array.map(el => el.id))];
  return array.filter(el => {
    let index = ids.indexOf(el.id);
    if (index >= 0) {
      ids.splice(index, 1);
      return true;
    }
    return false;
  });
};
