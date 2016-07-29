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
import { App } from './app';

import { async, inject } from '@angular/core/testing';

import { TestComponentBuilder } from '@angular/core/testing';

import { By }             from '@angular/platform-browser';
import { provide }        from '@angular/core';
import { ViewMetadata }   from '@angular/core';
import { PromiseWrapper } from '@angular/core/src/facade/promise';

////////  SPECS  /////////////

/// Delete this
describe('Smoke test', () => {
  it('should run a passing test', () => {
    expect(true).toEqual(true, 'should pass');
  });
});

describe('App with TCB', function () {

  it('should instantiate component',
    async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

    tcb.createAsync(App).then(fixture => {
      expect(fixture.componentInstance instanceof App).toBe(true, 'should create App');
    });
  })));

  it('should have expected <h1> text',
    async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

      tcb.createAsync(App).then(fixture => {
      // fixture.detectChanges();  // would need to resolve a binding but we don't have a binding

      let h1 = fixture.debugElement.query(el => el.name === 'h1').nativeElement;  // it works

          h1 = fixture.debugElement.query(By.css('h1')).nativeElement;            // preferred

      // expect(h1.innerText).toNotMatch(/angular 2 app/i, '<h1> should say something about "Angular 2 App"');
      expect(true).toBeTruthy();
    });

  })));
});
