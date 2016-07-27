import { Component, OnInit } from '@angular/core';

import { PassFailResult, ResultFailRatio, RatioPerUser } from '../data-structure';
import { CommService } from '../commService';

@Component({
    selector: 'success-rate',
    templateUrl: 'tsapp/dashboard/successRate.html'
})

export class SuccessRate implements OnInit {
    successRateFromServer: PassFailResult[];
    resultFailRatio: ResultFailRatio[];
    ratioPerUser: RatioPerUser[] = [];

    constructor(private commService: CommService) { }
    ngOnInit() {
        this.getServerPF();
        this.getServerRatio();
    }

    private getServerPF() {
        this.commService.passfailresult()
            .subscribe((arrayOfData: PassFailResult[]) => {
                if (arrayOfData[0]) {
                    this.successRateFromServer = arrayOfData;
                }
            },
            error => {
                console.log('ERROR:', error);
                // Warn the user and display the Oid red?
            });
    }

    private getServerRatio() {
        this.commService.resFailRatio()
            .subscribe((arrayOfData: ResultFailRatio[]) => {
                if (arrayOfData[0]) {
                    this.resultFailRatio = arrayOfData;
                    this.returnFailRatioPerUser(arrayOfData);
                }
            },
            error => {
                console.log('ERROR:', error);
                // Warn the user and display the Oid red?
            });
    }

    private returnFailRatioPerUser(arrayOfData: ResultFailRatio[]) {
        // Note: This is A stupid way of doing it because for unknown reason Reduce did not work, and typescript dosent allow me to iterate on Object and many more annoying reason.
        // if I knew how to do it in SQL I would instead since Typescript is annoying me at the moment.

        // TODO: When this work push this in a external service
        let listOfUserReceived: { [username: string]: number } = {};
        for (let i = 0; i < arrayOfData.length; i++) {
            let index: number = Object.keys(listOfUserReceived).length; // Number of user I iterated on so far.
            let curr: ResultFailRatio = arrayOfData[i];
            let currentUser: string = curr.username;

            if (listOfUserReceived[currentUser] === undefined) {
                this.ratioPerUser.push({
                    username: currentUser,
                    successGood: 0,
                    successBad: 0,
                    failedGood: 0,
                    failedBad: 0,
                });
                index = this.ratioPerUser.length - 1; // Keep the reference to the last item pushed.
                listOfUserReceived[currentUser] = index;  // keep a reference for later when I want to add more.
            } else {
                index = listOfUserReceived[currentUser];
            }
            if (curr.success === true && curr.golden_passfail_state === true) {
                // Success and it was on a Good image (easier case)
                this.ratioPerUser[index].successGood += parseInt(curr.ct, 10);
            } else if (curr.success === true && curr.golden_passfail_state === false) {
                // Success at rejecting a Bad image (Good job Mate!)
                this.ratioPerUser[index].successBad += parseInt(curr.ct, 10);
            } else if (curr.success === false && curr.golden_passfail_state === true) {
                // He rejected a Good image, Lower your criteria next time... But better to fail good than to accept bad one.
                this.ratioPerUser[index].failedGood += parseInt(curr.ct, 10);
            } else if (curr.success === false && curr.golden_passfail_state === false) {
                // He let a Bad image pass. Better tight those criteria for next time. We dont want to accept anything :/.
                this.ratioPerUser[index].failedBad += parseInt(curr.ct, 10);
            }
        }
    }

}
