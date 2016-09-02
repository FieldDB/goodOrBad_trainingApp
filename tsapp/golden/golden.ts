import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { DefaultDataService } from '../data.service';
import { GoldenRow, CriteriaObject, DbCriteria, CriteriaToSend } from '../data-structure';
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
    previousUuid: string;
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
            this.manualOid = null;
            this.goldenDetails.criteria_obj = {};
        });

    }

    getDefaultCriteria() {
        this.defaultDataService.arrOfCriteria()
            .then((data: CriteriaObject[]) => {
                this.criterialist = data;
            })
            .catch(error => console.error(error));
    }

    fetchOnEnter(event, oid) {
        if (event.keyCode === 13 && oid || event === 'getOld' && oid) {
            this.getPreciceImg(oid);
        }
    }

    private getPreciceImg(imgOid: number) {
        this.commService.getPreciceGolden(imgOid)
            .subscribe((arrayOf1: GoldenRow[]) => {
                if (arrayOf1[0]) {
                    this.goldenDetails = arrayOf1[0];
                    this.goldenDetails.info_url_arr = JSON.parse(this.goldenDetails.info_url) || [];
                    this.getUuidCriteria(this.goldenDetails.uuid);
                } else {
                    this.resetBlankImg();
                }
            },
            error => {
                console.log('ERROR:', error);
                // Warn the user and display the Oid red?
            });
    }

    private getUuidCriteria(uuid: string) {
        this.commService.getUuidCriteria(uuid)
            .subscribe((arrayOfCrit: DbCriteria[]) => {
                if (arrayOfCrit[0]) {
                  this.goldenDetails.criteria_obj = this.getKeyPairCrit(arrayOfCrit);
                } else {
                  this.goldenDetails.criteria_obj = {};
                }
            },
            error => {
                console.log('ERROR:', error);
                // Warn the user and display the Oid red?
            });
    }

    private getKeyPairCrit = (crit: DbCriteria[]) => {
        let tempObj: { [key: string]: string } = {};
        for (let i = 0; i < crit.length; i++) {
            tempObj[crit[i].crit_uuid] = crit[i].crit_value;
        }
        return tempObj;
    }

    private builtKeyValueArr = (crit: { [key: string]: string }) => {
      let keyValuePair: CriteriaToSend[] = [];
      for (let someKey in crit) {
        if (crit[someKey] !== undefined) {
          keyValuePair.push({'crit_uuid': someKey, 'value': crit[someKey]});
        }
      }
      return keyValuePair;
    }

    onSubmit() {
        this.goldenDetails.info_url = JSON.stringify(this.goldenDetails.info_url_arr);
        // TODO: Add Criteria obj to the DB in a seperate call when we have the UUID.
        console.log('Submitting the form', this.goldenDetails);
        // if there is a OID then update that exact image, otherwise push a new one.

        if (!this.goldenDetails.oid) {
            // New img so Submit as New.
            this.commService.postNewGoldenImg(this.goldenDetails)
                .subscribe(serverAnswer => {
                    this.previousOid = serverAnswer[0].oid;
                    let critToSend: CriteriaToSend[] = this.builtKeyValueArr(this.goldenDetails.criteria_obj);
                    if (critToSend[0] !== undefined) {
                        this.commService.updateGoldenCrit(serverAnswer[0].uuid, critToSend)
                          .subscribe(critAnswer => {
                            this.resetBlankImg();
                            // console.log('Success:', critAnswer);
                          },
                          error => {
                              console.log('ERROR:', error);
                          });
                    }
                },
                error => {
                    console.log('ERROR:', error);
                });
        } else {
            // Update old img
            this.commService.updateGoldenImg(this.goldenDetails, this.goldenDetails.oid)
                .subscribe(serverAnswer => {
                    this.previousOid = serverAnswer[0].oid;
                    let critToSend: CriteriaToSend[] = this.builtKeyValueArr(this.goldenDetails.criteria_obj);
                    if (critToSend[0] !== undefined) {
                        this.commService.updateGoldenCrit(serverAnswer[0].uuid, critToSend)
                          .subscribe(critAnswer => {
                            this.resetBlankImg();
                            // console.log('Success:', critAnswer);
                          },
                          error => {
                              console.log('ERROR:', error);
                          });
                    }
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
