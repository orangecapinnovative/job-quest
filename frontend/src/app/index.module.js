/* global malarkey:false, moment:false , _:false jQuery:false */

import { config } from './index.config';
import { routerConfig,ProgressBarService,inspirationsTripsResourceFactoryLongNameForMypleasure } from './index.route';
import { runBlock } from './index.run';
import {inspirationController} from './inspiration/inspiration.controller';
import {MainController} from './main/main.controller';
import {headerDirectiveForThisChallengeIReallyLoveAngularJSSuchALongName555} from './components/header/header.directive.js';

angular.module('mrPanJchallenge', ['anim-in-out','ngAnimate', 'ngTouch', 'ngSanitize','ngProgress', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr','ngProgress'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .constant('_',_)
  .constant('$jQuery',jQuery)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('progressBar',ProgressBarService)
  .factory('inspirations',inspirationsTripsResourceFactoryLongNameForMypleasure)
  .directive('header',headerDirectiveForThisChallengeIReallyLoveAngularJSSuchALongName555)
  .controller('MainController', MainController)
  .controller('InspirationController', inspirationController)
