import { Component } from '@angular/core';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
import { Http, Response } from '@angular/http';

import { GoldenRow } from 'tsapp/data-structure';
import { CommService } from 'tsapp/pictpage/commService';

@Component({
  selector: 'pictpage',
  directives: [ CORE_DIRECTIVES, NgIf ],
  templateUrl: 'tsapp/pictpage/pictpage.html',
  styleUrls: [ 'tsapp/pictpage/pictpage.css' ]
})

export class Pictpage implements OnInit {
	somejson: GoldenRow[];
	error: any;

	constructor(private commService: CommService){}

	getOneImg() {
    this.commService.getDbImg()
    				.subscribe((somejson:GoldenRow[])=>{this.somejson=somejson;});
        // .then(somejson => this.somejson = somejson)
        // .catch(error => this.error = error);
  }

}
