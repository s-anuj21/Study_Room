/*------ WHEN LOGIN ROUTE IS HITTED -----*/
export const login = async (email, password, st = '') => {
  email = email.trim();
  password = password.trim();

  const data = {
    email,
    password,
  };
  try {
    const url = `/api/users/login`;
    let res = await fetch(url, {
      method: 'POST',

      // It tells u about the type of file it is sending
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    res = await res.json();

    console.log(res);
    if (res.status != 'error') window.location.assign('/');
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

  const data = {
    name,
    email,
    password,
  };

  try {
    const url = `/api/users/signup`;

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
