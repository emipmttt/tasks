// a partir de un indice, se retorna el nombre
// del día de la semana correspondiente
export default (dayIndex) => {
  return (
    ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"][
      dayIndex
    ] || ""
  );
};
