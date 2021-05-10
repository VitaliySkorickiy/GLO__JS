// valid form

const validForm = (name, email, tel, mess) => {
  name.addEventListener('input', () => {
    name.value = name.value.replace(/[^\s\а-яА-ЯёЁ\-]/g, '').trim();
  });

  email.addEventListener('input', () => {
    email.value = email.value.replace(/[^A-Za-z0-9\-\.\_\!\~\*\'\@ ]/g, '').trim();
  });

  tel.addEventListener('input', () => {
    tel.value = tel.value.replace(/[^0-9\-\(\)]/gi, '').trim();
  });

  if (mess) {
    mess.addEventListener('input', () => {
      mess.value = mess.value.replace(/[^\s\а-яА-ЯёЁ\-]/g, '');
    });
  }
};

export default validForm;
