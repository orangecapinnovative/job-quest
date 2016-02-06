export function headerDirectiveForThisChallengeIReallyLoveAngularJSSuchALongName555() {
  'ngInject';
  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/header/header.html',
    scope: {

    },
    controller: headerController,
    controllerAs: 'header',
    bindToController: true
  }

  return directive;
}


class headerController {
  constructor($jQuery) {
    'ngInject';
    $jQuery('.ui.dropdown')
      .dropdown();
    $jQuery('#wheretogo')
      .dropdown({
        useLabels: false,
        maxSelections: 3
      });
  }
}
