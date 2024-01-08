import * as baseView from '../view/baseView.js';

/*------ WHEN SIGNUP ROUTE IS HIT -----*/
export const createGroup = async (name, subject, endDate, st = '') => {
  name = name.trim();
  subject = subject.trim();
  endDate = endDate.trim();

  const data = {
    name,
    subject,
    endDate,
  };

  try {
    const url = `/api/groups`;

    // baseView.DOMElements.btnSubmit.disabled = true;
    let res = await fetch(url, {
      method: 'POST',
      // credentials: 'same-origin', // This is to send cookies
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(data),
    });

    res = await res.json();

    // baseView.DOMElements.btnSubmit.disabled = false;

    if (res.status == 'success') window.location.assign('/');
    else {
      // Alert Failed
      let msg = res.message;
      if (!msg) msg = 'Something went wrong!!';
      baseView.customAlert(msg);
    }
  } catch (err) {
    console.log(err);
  }
};
/*  ############## */

// upload

export const uploadFiles = async (data, description) => {
  if (data.files.length < 1) {
    baseView.customAlert('Please select some files.');
    return;
  }
  const formData = new FormData();

  for (let i = 0; i < data.files.length; i++) {
    formData.append('files', data.files[i]);
  }

  const filesDescription = '';
  formData.append('description', filesDescription);

  const url = `/api/studyItems/${baseView.DOMElements.grpDetails.dataset.grpid}`;

  // baseView.DOMElements.btnSubmit.disabled = true;
  try {
    let res = await fetch(url, {
      method: 'POST',
      body: formData,
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
    });

    // baseView.DOMElements.btnSubmit.disabled = false;

    if (res) location.reload();
    else {
      let msg = res.message;
      if (!msg) msg = 'Something went wrong!!';
      baseView.customAlert(msg);
    }
  } catch (err) {
    console.log(err);
  }
};

// sendGroupJoinLink
export const sendGroupJoinLink = async (groupId, emailId) => {
  try {
    const url = `/api/groups/${groupId}/sendInvite`;

    let res = await fetch(url, {
      method: 'GET',
      // credentials: 'same-origin', // This is to send cookies
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        emailId,
      },
    });

    res = await res.json();

    if (res.status != 'success') {
      let msg = res.message;
      if (!msg) msg = 'Something went wrong!!';
      baseView.customAlert(msg);
      return;
    }
  } catch (err) {
    console.log(err);
  }
};
// ###################

export const generateJoinCode = async (grpId) => {
  try {
    const url = `/api/groups/${grpId}/generateJoinCode`;

    let res = await fetch(url, {
      method: 'GET',
      // credentials: 'same-origin', // This is to send cookies
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res = await res.json();

    if (res.status != 'success') {
      let msg = res.message;
      if (!msg) msg = 'Something went wrong!!';
      baseView.customAlert(msg);
      return;
    }
    baseView.DOMElements.joinCodeContent.innerHTML = res.joinTokenWithGrp;
  } catch (err) {
    console.log(err);
  }
};

export const joinGroup = async (joinTokenWithGrp) => {
  try {
    const [grpId, joinToken] = joinTokenWithGrp.trim().split('=');

    console.log(grpId, joinToken);

    const url = `/groups/${grpId}/joinGroup/${joinToken}`;
    let res = await fetch(url, {
      method: 'GET',
      // credentials: 'same-origin', // This is to send cookies
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res = await res.json();

    if (res.status != 'success') {
      let msg = res.message;
      if (!msg) msg = 'Something went wrong!!';
      baseView.customAlert(msg);
    }

    window.location.assign(`/groups/${grpId}`);
  } catch (err) {
    console.log(err);
  }
};

// Stuff Related to Group Deletion

// HANDLING CLICK ON CONFIRMATION MODAL
export const handleClickConfirmationModal = async (e) => {
  if (!e.target.matches('.modal-confirmation__btns__btn')) return;
  // CLOSE THE MODAL
  baseView.DOMElements.modalConfirmation.classList.remove('modal--showTop');

  // IF CLICK ON YES, DELETE THE COMMENT
  if (e.target.matches('.modal-confirmation__btns__btn--yes')) {
    deleteGroup(baseView.DOMElements.grpDetails.dataset.grpid);
  }
};

const deleteGroup = async (groupId) => {
  try {
    const url = `/api/groups/${groupId}`;

    let res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res = await res.json();

    if (res.status != 'success') {
      let msg = res.message;
      if (!msg) msg = 'Something went wrong!!';
      baseView.customAlert(msg);
      return;
    }
  } catch (err) {
    console.log(err);
  }
};
// End of Stuff Related to Group Deletion
// ###################
