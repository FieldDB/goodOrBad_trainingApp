import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

// import { } from '../data-structure';
import { CommService } from '../commService';

@Component({
  selector: 'top-mistake-img',
  templateUrl: 'tsapp/dashboard/topMistakeImg.html',
  directives: [ ROUTER_DIRECTIVES ]
})

export class TopMistakeImg implements OnInit {

  constructor(private commService: CommService) { }
  ngOnInit() {
    console.log('Initialisation of TopMistakeImg');
  }
}
