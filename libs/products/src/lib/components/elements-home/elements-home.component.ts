import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
// import {bootstrap} from 'node_modules/bootstrap/scss/bootstrap.scss';

@Component({
  selector: 'products-elements-home',
  templateUrl: './elements-home.component.html',
  styles: [
  ]
})
export class ElementsHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

}
