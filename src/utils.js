export const shuffleArray = (array, from = 0) => {
  let i = from,
    temp,
    j;

  // While there remain elements to shuffle…
  while (i != array.length - 1) {
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
