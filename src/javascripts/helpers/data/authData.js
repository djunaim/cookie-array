import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

import stocker from '../../components/stocker/stocker';

const authDiv = $('#auth');
const stockDiv = $('#stock');
const logoutNavbar = $('#navbarButtonLogout');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // someone is logged in - we should not see auth componenent
      stockDiv.removeClass('hide');
      logoutNavbar.removeClass('hide');
      authDiv.addClass('hide');
      stocker.buildTheStocker(user.uid);
    } else {
      // nobody loggin in show auth component
      stockDiv.addClass('hide');
      logoutNavbar.addClass('hide');
      authDiv.removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
