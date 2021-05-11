// valid form

const validForm = (name, email, tel, mess) => {
  name.addEventListener('blur', () => {
    name.value = name.value.replace(/[^\а-яА-ЯёЁ\-][/\s+/g,'']/g, '');
    return (name.value = name.value.replace(/(^|\s)\S/g, (a) => {
      return a.toUpperCase();
    }));
  });

  email.addEventListener('input', () => {
    email.value = email.value.replace(/[^A-Za-z0-9\-\.\_\!\~\*\'\@ ]/g, '').trim();
  });

  tel.addEventListener('input', () => {
    tel.value = tel.value.replace(/[^0-9\-\(\)]/gi, '').trim();
  });

  if (mess) {
    mess.addEventListener('blur', () => {
      mess.value = mess.value.replace(/[^\а-яА-ЯёЁ\-][\s+/g,'']/g, '');
    });
  }
};

export default validForm;
