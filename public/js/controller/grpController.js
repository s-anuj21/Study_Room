import * as baseView from '../view/baseView.js';

/*------ WHEN SIGNUP ROUTE IS HITTED -----*/
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

    let res = await fetch(url, {
      method: 'POST',
      // credentials: 'same-origin', // This is to send cookies
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(data),
    });

    res = await res.json();
    console.log(res);

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

export const uploadFiles = async (data) => {
  if (data.files.length < 1) {
    baseView.customAlert('Please select some files.');
    return;
  }
  const formData = new FormData();

  for (let i = 0; i < data.files.length; i++) {
    formData.append('files', data.files[i]);
  }

  const url = `/api/groups/${baseView.DOMElements.grpDetails.dataset.grpid}`;
  console.log(url);
  try {
    let res = await fetch(url, {
      method: 'POST',
      body: formData,
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
    });

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

// getGroupJoinLink
export const getGroupJoinLink = async (groupId) => {
  try {
    const url = `/api/groups/${groupId}/joinToken`;

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
    // Writing Link on Clipboard
    navigator.clipboard.writeText(res.joinLink);
    const copyLinkText = baseView.DOMElements.copyJoinLinkBtn.textContent;
    baseView.DOMElements.copyJoinLinkBtn.classList.add('grey-text');
    baseView.DOMElements.copyJoinLinkBtn.textContent = 'Link Copied!';

    // Ressetting text after copying
    setTimeout(() => {
      baseView.DOMElements.copyJoinLinkBtn.textContent = copyLinkText;
      baseView.DOMElements.copyJoinLinkBtn.classList.remove('grey-text');
    }, 1000);
  } catch (err) {
    console.log(err);
  }
};

// ###################

// Join Grp

export const joinGroup = async () => {
  try {
    const data = {
      groupId: `63ea8732d47ee6bf3a6eae2a`,
    };
    const url = `/api/users/updateMe/`;

    let res = await fetch(url, {
      method: 'PATCH',
      // credentials: 'same-origin', // This is to send cookies
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(data),
    });

    res = await res.json();

    if (res.status != 'success') {
      let msg = res.message;
      if (!msg) msg = 'Something went wrong!!';
      baseView.customAlert(msg);
    }
  } catch (err) {
    console.log(err);
  }
};
