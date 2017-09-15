/**
 * Created by stamoern on 15.09.17.
 */

import './index.css';
import TVConnection from './tv-connection';
import status from './status';
import Rotate from './rotate';
import Buttons from './buttons';

window.addEventListener('error',  event => status.error(event.error && event.error.message || 'Error'));

const tvConnection = new TVConnection();
status.log('Подключение к ТВ...');
Promise.resolve()
  .then(() => tvConnection.open())
  .then(() => status.ok('Подключено!'))
  .catch(e => status.error(e.message));

const buttons = new Buttons();
buttons.onAction.addListener(action => status.log(action));

// const rotate = new Rotate();
// rotate.onPortrait.addListener(() => {
//     status.log('Возьмите телефон как джойстик');
// });