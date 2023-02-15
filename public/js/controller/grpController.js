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

    // const res = await axios({
    //   method: 'POST',
    //   url: url,

    //   data: {
    //     email,
    //     password,
    //   },
    // });

    res = await res.json();

    console.log(res);
  } catch (err) {
    // utilities.renderAlertSecondary(err.response.data.message);
    console.log(err);
  }
};
/*  ############## */

// upload

export const uploadFiles = async (data) => {
  const formData = new FormData();

  for (let i = 0; i < data.files.length; i++) {
    formData.append('files', data.files[i]);
  }

  let grpDetails = document.querySelector('.grpDetails');
  const url = `/api/groups/${grpDetails.dataset.grpid}`;
  console.log(url);
  try {
    let res = await fetch(url, {
      method: 'POST',
      body: formData,
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
    });

    // let res = await axios({
    //   method: 'POST',
    //   headers: { 'Content-Type': 'multipart/form-data' },
    //   url: url,
    //   data: form,
    // });

    // res = await res.json(); not needed here
    // console.log(res);
    if (res) location.reload();
  } catch (err) {
    console.log(err);
  }
};

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
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

// Download Item Function
//  Not Using Currently
// export const downloadItem = async (filename) => {
//   try {
//     const url = `/api/groups/download/${filename}`;

//     let res = await fetch(url, {
//       method: 'GET',
//       // credentials: 'same-origin', // This is to send cookies
//       // headers: {
//       //   'Content-Type': 'application/json',
//       // },
//     });

//     console.log(res);
//   } catch (err) {
//     console.log(err);
//   }
// };
