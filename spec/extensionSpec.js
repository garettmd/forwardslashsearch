require('./setup.js');
var By = require('selenium-webdriver').By;
var until = require('selenium-webdriver').until;

var expect = require('chai').expect;


describe('extension', function () {
    it('focusses input on /', function (done) {
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

    it('prevents typing / once if field was autofocussed by page already like on google.com', function (done) {
        var inputField;
        var driver = this.driver();
        driver
            .get('http://0.0.0.0:3531/autofocus_input.html')
            .then(function (input) {
                return driver.executeScript('return document.activeElement;')
                    .then(function (input) {
                        return input.sendKeys('/')
                            .then(function () {
                                inputField = input;
                                return inputField.getAttribute('value');
                            })
                    })

            })
            .then(function (inputValue) {
                expect(inputValue).to.equal('');
            })
            .then(function () {
                return inputField.sendKeys('/')
                    .then(function () {
                        return inputField.getAttribute('value');
                    })
            })
            .then(function (inputValue) {
                expect(inputValue).to.equal('/');
                done();
            });

    });

});