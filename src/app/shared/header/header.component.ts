import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ls-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  @Input() title = 'default';

  constructor() { }

  ngOnInit() {
  }
}
