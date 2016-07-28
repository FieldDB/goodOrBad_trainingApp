import { Component, OnInit } from '@angular/core';

import { RatioPerUser, RatioPerUserPc } from '../data-structure';
import { CommService } from '../commService';

@Component({
    selector: 'success-rate',
    templateUrl: 'tsapp/dashboard/successRate.html'
})

export class SuccessRate implements OnInit {
    ratioPerUser: RatioPerUser[];
    ratioPerUserPc: RatioPerUserPc[];

    constructor(private commService: CommService) { }
    ngOnInit() {
        this.getServerRatio();
    }

    private getServerRatio() {
        this.commService.resFailRatio()
            .subscribe((arrayOfData: RatioPerUser[]) => {
                if (arrayOfData[0]) {
                    this.ratioPerUser = arrayOfData;
                    this.ratioPerUserPc = this.returnCalculatedArray(arrayOfData);
                }
            },
            error => {
                console.log('ERROR:', error);
                // Warn the user and display the Oid red?
            });
    }

    private returnCalculatedArray(arrOfData: RatioPerUser[]) {
        return arrOfData.map(user => {
            let successGood: number = parseInt(user.successgood, 10);
            let successBad: number = parseInt(user.successbad, 10);
            let failedGood: number = parseInt(user.failedgood, 10);
            let failedBad: number = parseInt(user.failedbad, 10);
            let total: number = parseInt(user.total, 10);

            let tempObject: RatioPerUserPc = {
                username: user.username,
                globSuccessRate: Math.round(((successGood + successBad) / total) * 10000) / 100,
                succOnGoodImg: Math.round((successGood / (successGood + failedGood)) * 10000) / 100,
                succOnBadImg: Math.round((successBad / (successBad + failedBad)) * 10000) / 100,
                total: parseInt(user.total, 10)
            }
            return tempObject;
        })
    }

    sumStr(str1: string, str2: string) {
      // This is junk, I should change all the type when I receive the data from the API directly via a interface.
      return parseInt(str1, 10) + parseInt(str2, 10);
    }

}
