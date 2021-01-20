export default (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;

  return {
    minutes,
    seconds,
  };
};
