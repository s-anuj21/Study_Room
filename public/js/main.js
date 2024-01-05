// import axios from 'axios';

// Solve the issue of importing, but wanna use fetch here

import * as baseView from './view/baseView.js';
import * as authenticate from './controller/authenticate.js';
import * as grpController from './controller/grpController.js';
import * as chatView from './view/chatView.js';

// ## When Login Form is submitted
if (baseView.DOMElements.formLogin) {
  baseView.DOMElements.formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    if (baseView.validateInputs()) {
      authenticate.login(
        baseView.DOMElements.email.value,
        baseView.DOMElements.password.value
      );
    }
  });
}
/* ###### */

// ## When SignUp Form is submitted
if (baseView.DOMElements.formSignup) {
  baseView.DOMElements.formSignup.addEventListener('submit', (e) => {
    e.preventDefault();
    if (baseView.validateInputs()) {
      authenticate.signup(
        baseView.DOMElements.name.value,
        baseView.DOMElements.email.value,
        baseView.DOMElements.password.value
      );
    }
  });
}
/* ###### */

// ## When Grp Creation Form is submitted
if (baseView.DOMElements.formGrpCreation) {
  baseView.DOMElements.formGrpCreation.addEventListener('submit', (e) => {
    e.preventDefault();
    if (baseView.validateInputs()) {
      grpController.createGroup(
        baseView.DOMElements.grpName.value,
        baseView.DOMElements.grpSubject.value,
        baseView.DOMElements.dateEnd.value
      );
    }
  });
}
/* ###### */

if (baseView.DOMElements.filesToUpload) {
  baseView.DOMElements.uploadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // if (baseView.validateInputs()) {
    grpController.uploadFiles(baseView.DOMElements.filesToUpload);
    // }
  });
}

// ## Handling Click of Join Button
if (baseView.DOMElements.btnGrpJoin) {
  baseView.DOMElements.btnGrpJoin.addEventListener('click', (e) => {
    e.preventDefault();
    grpController.joinGroup();
  });
}
/* ###### */

// Handling the Change file click
if (baseView.DOMElements.filesToUpload) {
  baseView.DOMElements.filesToUpload.addEventListener('change', function (e) {
    e.preventDefault();

    baseView.DOMElements.filesDesc.textContent =
      this.files.length + ` file chosen`;
  });
}

// Handling Click of Logout Button
if (baseView.DOMElements.logoutBtn) {
  baseView.DOMElements.logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    authenticate.logout();
  });
}
/* ###### */

// Handling Click of Copy join Link Button
if (baseView.DOMElements.copyJoinLinkBtn) {
  baseView.DOMElements.copyJoinLinkBtn.addEventListener('click', (e) => {
    e.preventDefault();
    grpController.getGroupJoinLink(
      baseView.DOMElements.grpDetails.dataset.grpid
    );
  });
}
/* ###### */

// Handling Click of Delete Group Button
if (baseView.DOMElements.grpDeleteBtn) {
  baseView.DOMElements.grpDeleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    baseView.DOMElements.modalConfirmation.classList.add('modal--showTop');
  });
}

if (baseView.DOMElements.modalConfirmation) {
  baseView.DOMElements.modalConfirmation.addEventListener('click', (e) => {
    e.preventDefault();
    grpController.handleClickConfirmationModal(e);
  });
}

// Handling Click of Ok Button of alert Modal
if (baseView.DOMElements.modalOkBtn) {
  baseView.DOMElements.modalOkBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.modalAlert').classList.remove('showAlert');
  });
}

// HANDLING CLICK ON MEMBER BUTTON
if (baseView.DOMElements.memberBtnToggle) {
  baseView.DOMElements.memberBtnToggle.addEventListener('click', () => {
    console.log('..');
    baseView.DOMElements.membersSection.classList.toggle(
      'grpDetails__members--show'
    );
    if (baseView.DOMElements.memberBtnToggle.name == 'close') {
      baseView.DOMElements.memberBtnToggle.name = 'people';
    } else {
      baseView.DOMElements.memberBtnToggle.name = 'close';
    }
  });
}

// Adding Join Input Code
// /groups/${req.params.grpId}/joinGroup/${joinToken}

// Handling chat input submission
if (baseView.DOMElements.chatRoomForm) {
  baseView.DOMElements.chatRoomForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (baseView.DOMElements.chatRoomInput.value) {
      chatView.handleChatInput(baseView.DOMElements.chatRoomInput.value);
    }
  });
}

// end

// Making tabs work
const handleTabSwich = (btn, el, otherBtn, otherEl) => {
  el.style.display = 'block';
  btn.style.backgroundColor = '#e67e22';
  otherEl.style.display = 'none';
  otherBtn.style.backgroundColor = '#fff';
};

if (baseView.DOMElements.grpDetails) {
  baseView.DOMElements.chatRoomBtnTab.addEventListener('click', () => {
    handleTabSwich(
      baseView.DOMElements.chatRoomBtnTab,
      baseView.DOMElements.chatRoom,
      baseView.DOMElements.materialBtnTab,
      baseView.DOMElements.grpMaterials
    );

    baseView.DOMElements.chatRoomContainer.scrollTop =
      baseView.DOMElements.chatRoomContainer.scrollHeight;
  });

  baseView.DOMElements.materialBtnTab.addEventListener('click', () => {
    handleTabSwich(
      baseView.DOMElements.materialBtnTab,
      baseView.DOMElements.grpMaterials,
      baseView.DOMElements.chatRoomBtnTab,
      baseView.DOMElements.chatRoom
    );

    baseView.DOMElements.grpMaterials.scrollTop =
      baseView.DOMElements.grpMaterials.scrollHeight;
  });
}
