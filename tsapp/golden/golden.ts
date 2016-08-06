import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { DefaultDataService } from '../data.service';
import { GoldenRow, CriteriaObject } from '../data-structure';
import { CommService } from '../commService';

@Component({
    selector: 'golden',
    directives: [NgIf, NgFor, NgClass],
    styleUrls: ['tsapp/golden/golden.css', 'tsapp/common/slider-style.css'],
    templateUrl: 'tsapp/golden/golden.html',
    providers: [CommService, DefaultDataService]
})

export class Golden implements OnInit {
    goldenDetails: GoldenRow;
    criterialist: CriteriaObject[];
    previousOid: number;
    manualOid: number;
    private sub: any;

    constructor(private commService: CommService,
        private defaultDataService: DefaultDataService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.getDefaultCriteria();
        this.sub = this.route.params.subscribe(params => {
            this.manualOid = +params['oid']; // (+) converts string 'oid' to a number
            if (this.manualOid) {
                this.getPreciceImg(this.manualOid);
            } else {
                this.resetBlankImg();
            }
        });
    }

    resetBlankImg() {
        this.defaultDataService.blankGoldenImg().then(data => {
            this.goldenDetails = data;
            this.goldenDetails.criteria_array_converted = []; // It seems that a empty array do not overwrite a array that already exist when receiving blank data.
            this.manualOid = null;
        });

    }

    getDefaultCriteria() {
        this.defaultDataService.arrOfCriteria().then(data => {
            this.criterialist = data;
        });
    }

    fetchOnEnter(event, oid) {
        if (event.keyCode === 13 && oid) {
            this.getPreciceImg(oid);
        }
    }

    private getPreciceImg(imgOid: number) {
        this.commService.getPreciceGolden(imgOid)
            .subscribe((arrayOf1: GoldenRow[]) => {
                if (arrayOf1[0]) {
                    this.goldenDetails = arrayOf1[0];
                    this.goldenDetails.criteria_array_converted = JSON.parse(this.goldenDetails.criteria_array);
                    this.goldenDetails.info_url_arr = JSON.parse(this.goldenDetails.info_url) || [];
                } else {
                    this.resetBlankImg();
                }
            },
            error => {
                console.log('ERROR:', error);
                // Warn the user and display the Oid red?
            });
    }

    onSubmit() {
        this.goldenDetails.criteria_array = JSON.stringify(this.goldenDetails.criteria_array_converted);
        this.goldenDetails.info_url = JSON.stringify(this.goldenDetails.info_url_arr);

        console.log('Submitting the form', this.goldenDetails);
        // if there is a OID then update that exact image, otherwise push a new one.

        if (!this.goldenDetails.oid) {
            // New img so Submit as New.
            this.commService.postNewGoldenImg(this.goldenDetails)
                .subscribe(serverAnswer => {
                    this.resetBlankImg();
                    console.log('Success with: ', serverAnswer);
                    this.previousOid = 1234;
                },
                error => {
                    console.log('ERROR:', error);
                });
        } else {
            // Update old img
            this.commService.updateGoldenImg(this.goldenDetails, this.goldenDetails.oid)
                .subscribe(serverAnswer => {
                    this.resetBlankImg();
                    console.log('Success with: ', serverAnswer);
                    this.previousOid = 1234;
                },
                error => {
                    console.log('ERROR:', error);
                });
        }

    }

    addToInfoUrl(newUrl: string) {
        if (newUrl) {
            this.goldenDetails.info_url_arr.push(newUrl);
        }
    }

    removeThisItem(arrayOfUrl: string[], index: number) {
        if (arrayOfUrl && index !== undefined) {
            arrayOfUrl.splice(index, 1);
        }
    }

    setRandomKittenUrl() {
        let nbr1: number = Math.floor(Math.random() * 200) + 250; // Nbr between 250 and 450px
        let nbr2: number = Math.floor(Math.random() * 200) + 250; // Nbr between 250 and 450px
        let grey: string = Math.random() > 0.5 ? 'g/' : '';
        this.goldenDetails.url = 'https://placekitten.com/' + grey + nbr1 + '/' + nbr2;
    }
}
