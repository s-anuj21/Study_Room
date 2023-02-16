export const DOMElements = {
  formLogin: document.querySelector('.form--login'),
  formSignup: document.querySelector('.form--signup'),
  formGrpCreation: document.querySelector('.form--grpCreation'),
  name: document.querySelector('.name'),
  email: document.querySelector('.email'),
  password: document.querySelector('.password'),
  grpName: document.querySelector('.grpName'),
  grpSubject: document.querySelector('.grpSubject'),
  btnGrpJoin: document.querySelector('.btn--grpJoin'),
  btnDownloadMaterial: document.querySelector(
    '.grpDetails__materials__list__item__btnDownload'
  ),
  dateToday: document.querySelector('.dateToday'),
  dateEnd: document.querySelector('.dateEnd'),
  filesToUpload: document.querySelector('.input--file'),
  filesDesc: document.querySelector('.inputFile__text'),
  logoutBtn: document.querySelector('.nav__list__item__logout'),
  uploadBtn: document.querySelector('.grpDetails__footer__btn--upload'),
  copyJoinLinkBtn: document.querySelector('.btn--linkCopy'),
  modalOkBtn: document.querySelector('.modalAlert__btn--ok'),
  passwordConfirm: document.querySelector('.password--confirm'),
  inputCommonArr: Array.from(document.querySelectorAll('.form__field__input')),
};

// Validations
const formInputErrorNotice = (el = '', msg = '') => {
  // Removing the error of particular input
  if (el && el.parentElement.querySelector('.formInput__error')) {
    el.parentElement
      .querySelector('.formInput__error')
      .parentElement.removeChild(
        el.parentElement.querySelector('.formInput__error')
      );
  }

  // If the function is not getting the msg, that means the notice should only be removed
  if (msg === '') return;

  const markUp = `
         <div class = 'para--small color--error formInput__error u-margin-top-extraSmall'>${msg}</div>
    `;
  el.insertAdjacentHTML('afterend', markUp);
};

// Basic validation of input fields
export const validateInputs = () => {
  for (let i = 0; i < DOMElements.inputCommonArr.length; i++) {
    if (DOMElements.inputCommonArr[i].value.length < 1) {
      formInputErrorNotice(
        DOMElements.inputCommonArr[i],
        'This field is mondatory'
      );
      return false;
    }
  }

  if (DOMElements.password) {
    if (DOMElements.password.length < 6) {
      alert('Enter Password of min 6 character!');
      return false;
    }
  }

  if (DOMElements.passwordConfirm) {
    if (DOMElements.passwordConfirm.length < 6) {
      alert('Enter Password of min 6 character!');
      return false;
    }
  }

  if (DOMElements.password && DOMElements.passwordConfirm) {
    if (DOMElements.password.value != DOMElements.passwordConfirm.value) {
      alert(`Password and Confirm Password doesn't match`);
      return false;
    }
  }

  return true;
};

if (DOMElements.dateToday) {
  let today = new Date();
  let dd = String(today.getDate());
  let mm = String(today.getMonth() + 1); //January is 0!
  let yyyy = today.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  today = yyyy + '-' + mm + '-' + dd;
  DOMElements.dateToday.value = today;
}

// Custom ALert
export const customAlert = (msg) => {
  const alertMarkup = `
      <div class = "modalAlert">
          <div class = "modalAlert__content">
              <div class = "modalAlert__para">
                  ${msg}
              </div>
              <a class = "modalAlert__btn--ok">Ok</a>
          </div>
      </div>
        `;

  document.querySelector('body').insertAdjacentHTML('beforeend', alertMarkup);
};
