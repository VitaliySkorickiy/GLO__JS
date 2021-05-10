// valid form

const validForm = (name, email, tel, mess) => {
  name.addEventListener('input', () => {
    name.value = name.value.replace(/[^А-Яа-яЁё]/gi, '').trim();
  });

  email.addEventListener('input', () => {
    email.value = email.value.replace(/[^A-Za-z0-9\@. ]/g, '').trim();
  });

  tel.addEventListener('input', () => {
    tel.value = tel.value.replace(/[^0-9\+]/gi, '').trim();
  });

  if (mess) {
    mess.addEventListener('input', () => {
      mess.value = mess.value.replace(/[^\s\а-яА-ЯёЁ0-9\-]/g, '');
    });
  }
};

export default validForm;
