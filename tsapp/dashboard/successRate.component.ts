import { Component, OnInit } from '@angular/core';

import { RatioPerUser, RatioPerUserStr, RatioPerUserPc } from '../data-structure';
import { CommService } from '../commService';

@Component({
    selector: 'success-rate',
    templateUrl: 'tsapp/dashboard/successRate.html'
})

export class SuccessRate implements OnInit {
    ratioPerUser: RatioPerUserStr[];
    ratioPerUserPc: RatioPerUserPc[];

    constructor(private commService: CommService) { }
    ngOnInit() {
        this.getServerRatio();
    }

    private getServerRatio() {
        this.commService.resFailRatio()
            .subscribe((arrayOfData: RatioPerUserStr[]) => {
                if (arrayOfData[0]) {
                    this.ratioPerUser = this.transformToGoodType(arrayOfData);
                    this.ratioPerUserPc = this.returnCalculatedArray(this.ratioPerUser);
                }
            },
            error => {
                console.log('ERROR:', error);
                // Warn the user and display the Oid red?
            });
    }

    private returnCalculatedArray(arrOfData: RatioPerUser[]) {
        return arrOfData.map(user => {
            return {
                username: user.username,
                globSuccessRate: Math.round(((user.successgood + user.successbad) / user.total) * 10000) / 100,
                succOnGoodImg: Math.round((user.successgood / (user.successgood + user.failedgood)) * 10000) / 100,
                succOnBadImg: Math.round((user.successbad / (user.successbad + user.failedbad)) * 10000) / 100,
                total: user.total
            };

        });
    }

    private transformToGoodType (arrToCheck) {
      return arrToCheck.map(user => {
        return {
            username: user.username,
            successgood: parseInt(user.successgood, 10),
            successbad: parseInt(user.successbad, 10),
            failedgood: parseInt(user.failedgood, 10),
            failedbad: parseInt(user.failedbad, 10),
            total: parseInt(user.total, 10)
        };
      });
    }

}
