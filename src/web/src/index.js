import isUndefined from 'lodash/isUndefined';
import { ServiceRegistry } from 'single-malt';

import BeverageService from './services/BeverageService';
import FoodService from './services/FoodService';
import AuthorizationService from './services/AuthorizationService';
import StyleService from './services/StyleService';

// load widgets
import ListBuilder from './components/ListBuilder';
import TabBar from './components/TabBar';
import SlideInput from './components/SlideInput';
import AlertBar from './components/AlertBar';
import RadioButton from './components/RadioButton';
import RadioButtonGroup from './components/RadioButtonGroup';
import SlideCheckbox from './components/SlideCheckbox';
import SlideCalendar from './components/SlideCalendar';
import SlideSpinner from './components/SlideSpinner';
import SlideTimePicker from './components/SlideTimePicker';

// setup services
ServiceRegistry.register(
  AuthorizationService,
  StyleService,
  BeverageService,
  FoodService);

const AppFrame = require('./AppFrame');

const rootApp = document.createElement('app-frame');
document.body.appendChild(rootApp);
