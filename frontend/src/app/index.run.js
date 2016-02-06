export function runBlock($log,$rootScope) {
  'ngInject';
  $log.debug('runBlock end');
  $rootScope.$on('animStart', function() {
    $log.log('animStart');
  });

  $rootScope.$on('animEnd', function() {
    $log.log('animEnd');
  });
}
