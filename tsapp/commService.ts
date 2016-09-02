import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { GoldenRow, ResultValue, RatioPerUserStr, DbCriteria, ReturnInfo, CriteriaToSend } from './data-structure';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/Rx';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CommService {
    baseUrl: string = 'http://localhost:8010/';
    constructor(private http: Http) {
    }
    // Result page
    getDbImg(): Observable<GoldenRow[]> {
        let randgoldenUrl = this.baseUrl + 'api/view/randgolden/';  // URL to web api
        return this.http.get(randgoldenUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    postDbResult(result: ResultValue): Observable<ResultValue> {
        let resultUrl = this.baseUrl + 'api/result';  // URL to web api
        let body = JSON.stringify(result);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(resultUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // Golden Sample page
    getAllGolden(): Observable<GoldenRow[]> {
        let goldenImg: string = this.baseUrl + 'api/golden/';
        return this.http.get(goldenImg)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getPreciceGolden(imgOid: number): Observable<GoldenRow[]> {
        let goldenImg: string = this.baseUrl + 'api/golden/' + imgOid;
        return this.http.get(goldenImg)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getUuidCriteria(uuid: string): Observable<DbCriteria[]> {
        let goldenImg: string = this.baseUrl + 'api/golden/crit/' + uuid;
        return this.http.get(goldenImg)
            .map(this.extractData)
            .catch(this.handleError);
    }

    postNewGoldenImg(result: GoldenRow): Observable<ReturnInfo> {
        let body = JSON.stringify(result);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + 'api/golden', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateGoldenImg(result: GoldenRow, oid: number): Observable<ReturnInfo> {
        let body = JSON.stringify(result);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + 'api/golden/' + oid, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateGoldenCrit(uuid: string, critToSend: CriteriaToSend[]): Observable<{rowCount: number}> {
        let body = JSON.stringify({
          'uuid': uuid,
          'valueArray': critToSend
        });

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log('updating img', body);
        return this.http.post(this.baseUrl + 'api/golden/crit', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // Differents API Views Querry
    // TODO: Refactor of ALL this.
    resFailRatio(username?: string): Observable<RatioPerUserStr[]> {
        let getUrl: string = this.baseUrl + 'api/view/totimgfailratio/';
        if (username) { getUrl = getUrl + username; }
        return this.http.get(getUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
