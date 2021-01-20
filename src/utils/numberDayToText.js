export default (dayIndex) => {
  return (
    ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"][
      dayIndex
    ] || ""
  );
};
