import * as baseView from '../view/baseView.js';

/*------ WHEN LOGIN ROUTE HITS -----*/
export const login = async (email, password, st = '') => {
  email = email.trim();
  password = password.trim();
  // Saving the url, to which want to redirect after login
  const prevUrl = window.location;
  const data = {
    email,
    password,
  };
  try {
    const url = `/api/users/login`;
    baseView.DOMElements.btnSubmit.disabled = true;
    let res = await fetch(url, {
      method: 'POST',

      // It tells u about the type of file it is sending
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    res = await res.json();
    baseView.DOMElements.btnSubmit.disabled = false;

    if (res.status == 'success' && prevUrl.pathname != '/login')
      window.location.assign(prevUrl);
    else if (res.status != 'success') {
      // Alert Failed
      let msg = res.message;
      if (!msg) msg = 'Wrong Email or Password!!';
      baseView.customAlert(msg);
    } else window.location.assign('/');
  } catch (err) {
    console.log(err);
  }
};
/*  ############## */

/*------ WHEN SIGNUP ROUTE IS HITTED -----*/
export const signup = async (name, email, password, st = '') => {
  name = name.trim();
  email = email.trim();
  password = password.trim();

  const prevUrl = window.location;

  const data = {
    name,
    email,
    password,
  };

  try {
    const url = `/api/users/signup`;

    baseView.DOMElements.btnSubmit.disabled = true;

    let res = await fetch(url, {
      method: 'POST',
      // credentials: 'same-origin', // This is to send cookies
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(data),
    });

    res = await res.json();

    baseView.DOMElements.btnSubmit.disabled = false;

    if (res.status == 'success' && prevUrl.pathname != '/signup')
      window.location.assign(prevUrl);
    else if (res.status != 'success') {
      //Alert Failed
      let msg = res.message;
      if (!msg) msg = 'Something went wrong!!';
      baseView.customAlert(msg);
    } else window.location.assign('/');
  } catch (err) {
    console.log(err);
  }
};
/*  ############## */

/*------ CALLED WHEN LOGOUT ROUTE HITS -----*/
export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/users/logout`,
    });

    if (res) location.reload();
    // utilities.renderAlertSecondary('Logged out successfully', false, '/');
  } catch (err) {
    // utilities.renderAlertSecondary(err.response.data.message);
  }
};
/*  ############## */
