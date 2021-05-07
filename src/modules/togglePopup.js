const togglePopup = () => {
  const popup = document.querySelector('.popup'),
    popupBtn = document.querySelectorAll('.popup-btn');

  popupBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      popup.style.display = 'block';
    });
  });

  popup.addEventListener('click', (e) => {
    let target = e.target;

    if (target.classList.contains('popup-close')) {
      popup.style.display = '';
    } else {
      target = target.closest('.popup-content');
      if (!target) {
        popup.style.display = '';
      }
    }
  });
};
export default togglePopup;
