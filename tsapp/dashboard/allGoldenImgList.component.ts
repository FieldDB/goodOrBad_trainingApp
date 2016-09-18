import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { GoldenRow, SearchCriteria } from '../data-structure';
import { CommService } from '../commService';
import { FilterOnRequest } from './filter.pipe';

@Component({
    selector: 'golden-img-list',
    templateUrl: 'tsapp/dashboard/allGoldenImg.html',
    styleUrls: ['tsapp/dashboard/dashboard.css'],
    pipes: [ FilterOnRequest ],
    directives: [ROUTER_DIRECTIVES]
})

export class AllGoldenImgList implements OnInit {
    allGoldenImgFromServer: GoldenRow[];
    listStart: number = 0;
    listEnd: number = 20;
    steps: number = 20;
    tableLength: number;
    pagination: number[];
    search: SearchCriteria = {
      name: '',
      deleted: 'All',
      status: 'All'
    };

    constructor(private commService: CommService) {
    }
    ngOnInit() {
        this.getAllImg();
    }



    private getAllImg() {
        this.commService.getAllGolden()
            .subscribe((arrayOfImg: GoldenRow[]) => {
                if (arrayOfImg[0]) {
                    this.allGoldenImgFromServer = arrayOfImg;
                    this.tableLength = arrayOfImg.length;
                    this.pagination = Array.from(new Array(Math.ceil(this.tableLength / this.steps)), (x, i) => i);
                }
            },
            error => {
                console.log('ERROR:', error);
                // Warn the user and display the Oid red?
            });
    }

    moveToPage = (page: number) => {
        if (page !== undefined) {
            this.listStart = this.steps * page;
            this.listEnd = this.steps * (page + 1);
        }
    }

    setClasswithValue = (passFail: boolean) => {
        if (passFail === true) {
            return 'bg-success';
        } else if (passFail === false) {
            return 'bg-danger';
        }
    }
}
