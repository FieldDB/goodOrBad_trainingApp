import { Component } from '@angular/core';

@Component({
    selector: 'login',
    templateUrl: 'tsapp/login/login.html'
})
export class Login {
    role: string;
    constructor() {
        this.role = JSON.parse(localStorage.getItem('goodOrBadUser')).role;
    }
    createmanager() {
        let user = {
            email: 'thisWillWork@gmail.com',
            username: 'awesomePerson',
            name: 'aGoodUser',
            role: 'manager'
        };
        localStorage.setItem('goodOrBadUser', JSON.stringify(user));
        let retreaving = JSON.parse(localStorage.getItem('goodOrBadUser'));
        console.log(retreaving);
        this.role = retreaving.role;
    }

    createuser() {
        let user = {
            email: 'thisWillWork@gmail.com',
            username: 'awesomePerson',
            name: 'aGoodUser',
            role: 'Simple mortal'
        };
        localStorage.setItem('goodOrBadUser', JSON.stringify(user));
        let retreaving = JSON.parse(localStorage.getItem('goodOrBadUser'));
        console.log(retreaving);
        this.role = retreaving.role;
    }

}
