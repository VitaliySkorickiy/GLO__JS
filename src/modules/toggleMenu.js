const toggleMenu = () => {
  const menu = document.querySelector('menu');

  document.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest('.menu')) {
      menu.classList.add('active-menu');
    } else if (target.closest('.close-btn') || target.closest('li') || target.closest('body')) {
      menu.classList.remove('active-menu');
    }
  });
};
export default toggleMenu;
