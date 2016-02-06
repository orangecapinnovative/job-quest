export class MainController {
  constructor ($timeout, toastr,trips,progressBar) {
    'ngInject';
    progressBar.success();
    this.inspirations_layouts = trips.inspiration_layouts;
  }

}
