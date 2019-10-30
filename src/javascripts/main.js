import 'bootstrap';
import '../styles/main.scss';
import firebase from 'firebase';
import apiKeys from './helpers/apiKeys.json';
import loginButton from './components/Auth/auth';
import authData from './helpers/data/authData';
import logoutButton from './components/myNavBar/myNavBar';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  loginButton.loginButton();
  logoutButton.logoutEvent();
};

init();
