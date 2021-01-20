// obtener un número aleatorio entre
// dos números
export default (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
