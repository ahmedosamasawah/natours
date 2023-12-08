/* eslint-disable */
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';

const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

console.log(userPasswordForm);

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });
}

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateSettings({ name, email }, 'data');
  });

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const password = document.getElementById('password').value;
    const passwordCurrent = document.getElementById('password-current').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateSettings({ passwordCurrent, password, passwordConfirm }, 'password');

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password-confirm').value = '';
    document.getElementById('password').value = '';
  });
}

if (logoutBtn) logoutBtn.addEventListener('click', logout);

// const signup = async (name, email, password, passwordConfirm) => {
//   try {
//     const resultSignup = await axios({
//       method: 'POST',
//       url: 'http://127.0.0.1:3000/api/v1/users/signup',
//       data: {
//         name,
//         email,
//         password,
//         passwordConfirm
//       }
//     });
//     if (resultSignup.data.status === 'success') {
//       alert('logged in successfully');
//       window.setTimeout(() => {
//         location.assign('/');
//       }, 1500);
//     }
//   } catch (err) {
//     alert(err.response.data.message);
//   }
// };

// document.querySelector('.registerUser').addEventListener('submit', e => {
//   e.preventDefault();

//   const name = document.getElementById('name').value;
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
//   const passwordConfirm = document.getElementById('passwordConfirm').value;
//   signup(name, email, password, passwordConfirm);
// });
