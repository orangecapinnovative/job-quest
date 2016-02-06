export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main',
      resolve: {
        trips: (inspirations) => {
          return inspirations.getData();
        }
      }
    })
    .state('inspiration', {
      url: '/inspiration/:_id',
      templateUrl: 'app/inspiration/inspiration.html',
      controller: 'InspirationController',
      controllerAs: 'inspiration',
      resolve: {
        inspiration: ($stateParams, inspirations) => {
          //TODO: api edge doesn't found just do reload data;
          return inspirations.getData($stateParams._id);
        }
      }
    });

  $urlRouterProvider.otherwise('/');
}

export class ProgressBarService {
  constructor(ngProgressFactory) {
    'ngInject';
    this.bar = ngProgressFactory.createInstance();
    this.bar.setColor('#1eb6e7');
  }
  start() {
    this.bar.reset();
    this.bar.start();
  }
  success() {
    this.bar.complete();
  }
}

//Restful service
export function inspirationsTripsResourceFactoryLongNameForMypleasure($resource, $log, $q, progressBar, $timeout) {
  'ngInject';
  //Add npProgress to ngResource promise

  let resource = $resource('https://www.takemetour.com/api/home');
  this.getData = function(_id) {
    progressBar.start();
    let deferred = $q.defer();
    resource.get({}, (res) => {
      progressBar.success();
      if (typeof _id !== "undefined") {
        let union = []
        _.each(res.inspiration_layouts,item=>{
          union = union.concat(item.columns);
        })
        let result = _.where(union, {
          _id: _id
        })
        deferred.resolve(result);
      } else {
        deferred.resolve(res);
      }
    });
    return deferred.promise;
  }

  return this;
}
