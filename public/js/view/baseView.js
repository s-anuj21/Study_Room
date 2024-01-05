export const DOMElements = {
  formLogin: document.querySelector('.form--login'),
  formSignup: document.querySelector('.form--signup'),
  btnSubmit: document.querySelector('.form__field__btn--submit'),
  formGrpCreation: document.querySelector('.form--grpCreation'),
  name: document.querySelector('.name'),
  email: document.querySelector('.email'),
  password: document.querySelector('.password'),
  grpName: document.querySelector('.grpName'),
  grpSubject: document.querySelector('.grpSubject'),
  btnGrpJoin: document.querySelector('.btn--grpJoin'),
  grpDetails: document.querySelector('.grpDetails'),
  grpMaterials: document.querySelector('.grpDetails__materials'),
  btnDownloadMaterial: document.querySelector(
    '.grpDetails__materials__list__item__btnDownload'
  ),
  dateToday: document.querySelector('.dateToday'),
  dateEnd: document.querySelector('.dateEnd'),
  filesToUpload: document.querySelector('.input--file'),
  filesDesc: document.querySelector('.inputFile__text'),
  logoutBtn: document.querySelector('.nav__list__item__logout'),
  uploadBtn: document.querySelector('.grpDetails__footer__btn--upload'),
  memberBtnToggle: document.querySelector('.memberBtn--toggle'),
  membersSection: document.querySelector('.grpDetails__members'),
  copyJoinLinkBtn: document.querySelector('.btn--linkCopy'),
  modalOkBtn: document.querySelector('.modalAlert__btn--ok'),
  passwordConfirm: document.querySelector('.password--confirm'),
  inputCommonArr: Array.from(document.querySelectorAll('.form__field__input')),

  // chatRoom
  chatRoom: document.querySelector('.chatRoom'),
  chatRoomContainer: document.querySelector('.chatRoom__container'),
  chatRoomMsgsList: document.querySelector('.chatRoom__messages__list'),
  chatRoomTyping: document.querySelector('.chatRoom__messages__typingText'),
  chatRoomForm: document.querySelector('.chatRoom__form'),
  chatRoomInput: document.querySelector('.chatRoom__form__input'),
  materialBtnTab: document.querySelector(
    '.grpDetails__contents__tabs__btns--material'
  ),
  chatRoomBtnTab: document.querySelector(
    '.grpDetails__contents__tabs__btns--chatRoom'
  ),
};

// Validations
const formInputErrorNotice = (el = '', msg = '') => {
  // Removing the error of particular input
  if (el && el.parentElement.querySelector('.formInput__error')) {
    console.log('dsf');
    el.parentElement
      .querySelector('.formInput__error')
      .parentElement.removeChild(
        el.parentElement.querySelector('.formInput__error')
      );
  }

  // If the function is not getting the msg, that means the notice should only be removed
  if (msg === '') return;

  const markUp = `
         <div class = 'color--error formInput__error'>${msg}</div>
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
    } else {
      formInputErrorNotice(DOMElements.password);
    }
  }

  if (DOMElements.passwordConfirm) {
    if (DOMElements.passwordConfirm.value.length < 6) {
      formInputErrorNotice(
        DOMElements.passwordConfirm,
        'Enter Password of min 6 character!'
      );
      return false;
    } else {
      formInputErrorNotice(DOMElements.passwordConfirm);
    }
  }

  if (DOMElements.password && DOMElements.passwordConfirm) {
    if (DOMElements.password.value.length < 6) {
      formInputErrorNotice(
        DOMElements.password,
        'Enter Password of min 6 character!'
      );
      return false;
    } else {
      formInputErrorNotice(DOMElements.password);
    }

    if (DOMElements.password.value != DOMElements.passwordConfirm.value) {
      formInputErrorNotice(
        DOMElements.passwordConfirm,
        `Password and Confirm Password doesn't match`
      );
      return false;
    } else {
      formInputErrorNotice(DOMElements.passwordConfirm);
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
  DOMElements.dateEnd.setAttribute('min', today);
}

// CUSTOM ALERT
export const customAlert = (msg) => {
  document.querySelector('.modalAlert').classList.add('showAlert');
  document.querySelector('.modalAlert__para').textContent = msg;
};
