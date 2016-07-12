require('./setup.js');
var By = require('selenium-webdriver').By;
var until = require('selenium-webdriver').until;

var expect = require('chai').expect;


describe('extension', function () {
    it('it focusses input on /', function (done) {
        var driver = this.driver();
        driver.get('http://0.0.0.0:3531/simple_input.html');
        driver.findElement(By.css('body'))
            .then(function (body) {
                body.sendKeys('/');
            })
            .then(function () {
                return driver.executeScript('return document.activeElement.id;')
            })
            .then(function (inputId) {
                expect(inputId).to.equal('search');
                done();
            });


    });
});