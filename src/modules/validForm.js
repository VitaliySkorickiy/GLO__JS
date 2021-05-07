// valid form

const validForm = (name, email, tel, mess) => {
  name.addEventListener('input', () => {
    name.value = name.value.replace(/[^А-Яа-яЁё\ ]/gi, '').trim();
  });

  email.addEventListener('blur', () => {
    email.value = email.value.replace(/[^A-Za-z0-9\@. ]/gi, '').trim();
  });

  tel.addEventListener('input', () => {
    tel.value = tel.value.replace(/[^0-9\+]/gi, '').trim();
  });

  if (mess) {
    const regMess = /^[?!,.а-яА-ЯёЁ0-9\s]+$/;
    mess.addEventListener('input', () => {
      if (!regMess.test(mess.value)) {
        mess.value = '';
      }
    });
  }
};

export default validForm;
