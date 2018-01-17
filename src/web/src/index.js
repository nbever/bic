import isUndefined from 'lodash/isUndefined';
import { ServiceRegistry } from 'single-malt';

import AuthorizationService from './services/AuthorizationService';
import StyleService from './services/StyleService';
import ModalService from './services/ModalService';
import UserService from './services/UserService';
import IncidentService from './services/IncidentService';

// load widgets
// import ListBuilder from './components/ListBuilder';
// import TabBar from './components/TabBar';
// import SlideInput from './components/SlideInput';
// import AlertBar from './components/AlertBar';
// import RadioButton from './components/RadioButton';
// import RadioButtonGroup from './components/RadioButtonGroup';
// import SlideCheckbox from './components/SlideCheckbox';
// import SlideCalendar from './components/SlideCalendar';
// import SlideSpinner from './components/SlideSpinner';
// import SlideTimePicker from './components/SlideTimePicker';
// import SlideDropDown from './components/SlideDropDown';
// import BicModal from './components/Modal';
// import SlideButton from './components/SlideButton';

// setup services
ServiceRegistry.register(
  AuthorizationService,
  UserService,
  StyleService,
  ModalService,
  IncidentService
);

const AppFrame = require('./AppFrame');

const rootApp = document.createElement('app-frame');
document.body.appendChild(rootApp);
