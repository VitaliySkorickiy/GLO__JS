// calc

const validCalc = () => {
  const itemCalc = document.querySelectorAll('input.calc-item');

  itemCalc.forEach((item) => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/\D/g, '');
    });
  });
};
export default validCalc;
