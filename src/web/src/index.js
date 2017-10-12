import isUndefined from 'lodash/isUndefined';
import { ServiceRegistry } from 'single-malt';

import BeverageService from './services/BeverageService';
import FoodService from './services/FoodService';

// load widgets
import ListBuilder from './components/ListBuilder';
import TabBar from './components/TabBar';
import SlideInput from './components/SlideInput';

// setup services
ServiceRegistry.register(BeverageService, FoodService);

const AppFrame = require('./AppFrame');

const rootApp = document.createElement('app-frame');
document.body.appendChild(rootApp);
