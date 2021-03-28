import * as ReactDOM from 'react-dom';
import initializeFirebase from './firebase/initializeFirebase';
import Root from './Root';

initializeFirebase();

const rootEl = document.getElementById('root');
ReactDOM.render(<Root />, rootEl);
