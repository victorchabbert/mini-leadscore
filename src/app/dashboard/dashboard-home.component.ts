import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ls-dashboard-home',
  template: `
    <div class="ma3">
      <h1 class="f1 ma0">Dashboard</h1>
      <h3 class="f3 mt4 mb1">Author</h3>
      <p><a class="link black hover-blue" href="https://github.com/victorchabbert">Victor Chabbert</a></p>
      <h3 class="f3 mt4 mb1">Additional dependencies</h3>
      <ul class="list pl0 measure">
        <li class="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30">
          <a class="black link hover-blue" href="https://github.com/orizens/angular2-infinite-scroll">angular2-infinite-scroll</a>
        </li>
        <li class="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30">
          <a class="black link hover-blue" href="http://tachyons.io/">tachyons</a>
        </li>
        <li class="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30">
          <a class="black link hover-blue" href="https://materialdesignicons.com/">material design icons</a>
        </li>
        <li class="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30">
          <a class="black link hover-blue" href="https://github.com/tobiasahlin/SpinKit">css spinners</a>
        </li>
      </ul>
    </div>
  `,
})
export class DashboardHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
