/*
======== A Handy Little Jasmine Reference ========
inspired by  https://github.com/pivotal/jasmine/wiki/Matchers
Spec matchers:
expect(x).toEqual(y); compares objects or primitives x and y and passes if they are equivalent
expect(x).toBe(y); compares objects or primitives x and y and passes if they are the same object
expect(x).toMatch(pattern); compares x to string or regular expression pattern and passes if they match
expect(x).toBeDefined(); passes if x is not undefined
expect(x).toBeUndefined(); passes if x is undefined
expect(x).toBeNull(); passes if x is null
expect(x).toBeTruthy(); passes if x evaluates to true
expect(x).toBeFalsy(); passes if x evaluates to false
expect(x).toContain(y); passes if array or string x contains y
expect(x).toBeLessThan(y); passes if x is less than y
expect(x).toBeGreaterThan(y); passes if x is greater than y
expect(x).toBeCloseTo; matcher is for precision math comparison
expect(x).toThrow; matcher is for testing if a function throws an exception
expect(x).toThrowError; matcher is for testing a specific thrown exception
expect(function(){fn();}).toThrow(e); passes if function fn throws exception e when executed
Every matcher's criteria can be inverted by prepending .not:
expect(x).not.toEqual(y); compares objects or primitives x and y and passes if they are not equivalent
Custom matchers help to document the intent of your specs, and can help to remove code duplication in your specs.
beforeEach(function() {
this.addMatchers({});
*/
/* tslint:disable:no-unused-variable */
import { Login } from './login';
import { Component } from '@angular/core';

import { async, inject, TestComponentBuilder } from '@angular/core/testing';
import { By }             from '@angular/platform-browser';

////////  SPECS  /////////////
// export class MocklocalStorage {
//   getItem() {
//     return {
//         email: 'thisWillWork@gmail.com',
//         username: 'awesomePerson',
//         name: 'aGoodUser',
//         role: 'manager'
//     };
//   }
// }

describe('Login Component', function () {

  it('should instantiate the Login component', () => {
    expect(Login).toBeDefined();
    // I tried for Many hours and at the moment I cannot make the Provider work.
    // I can construct a function but as soon as it need a external module everything break.
    // It seems that I dont understand "provite" or that it dosent work yet.
    // I will come back to the Injection in time when Angular will be more stable.
  });

});
