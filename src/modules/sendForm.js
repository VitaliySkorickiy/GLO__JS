const sendForm = (form) => {
  const errorMessage = 'Что-то пошло не так...',
    loadMessage = 'Загрузка...',
    successMessage = 'Спасибо! Мы скоро с Вами свяжимся!';

  const statusMessage = document.createElement('div');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    form.appendChild(statusMessage);

    const formData = new FormData(form);

    statusMessage.textContent = loadMessage;

    postData(formData)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('status network not 200');
        }
        statusMessage.textContent = successMessage;
      })
      .catch((error) => {
        statusMessage.textContent = errorMessage;
        console.error(error);
      });
    form.querySelectorAll('input').forEach((item) => (item.value = ''));
  });

  const postData = (formData) => {
    return fetch('server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formData,
      credentials: 'include',
    });
  };
};
export default sendForm;
