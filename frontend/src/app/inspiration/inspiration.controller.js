export class inspirationController {
  constructor(inspiration,progressBar){
    'ngInject';
    progressBar.success();
    this.data = inspiration;
  }
}
