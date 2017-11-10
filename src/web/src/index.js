import isUndefined from 'lodash/isUndefined';
import { ServiceRegistry } from 'single-malt';

import BeverageService from './services/BeverageService';
import FoodService from './services/FoodService';
import AuthorizationService from './services/AuthorizationService';

// load widgets
import ListBuilder from './components/ListBuilder';
import TabBar from './components/TabBar';
import SlideInput from './components/SlideInput';
import AlertBar from './components/AlertBar';

// setup services
ServiceRegistry.register(AuthorizationService, BeverageService, FoodService);

const AppFrame = require('./AppFrame');

const rootApp = document.createElement('app-frame');
document.body.appendChild(rootApp);
