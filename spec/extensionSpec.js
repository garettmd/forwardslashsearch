require('./setup.js');
var By = require('selenium-webdriver').By;
var until = require('selenium-webdriver').until;

var expect = require('chai').expect;


describe('extension', function () {
    it('focusses input on / and allows to type', function (done) {
        var inputField;
        var driver = this.driver();
        driver.get('http://0.0.0.0:3531/simple_input.html');
        driver.findElement(By.css('body'))
            .then(function (body) {
                body.sendKeys('/');
            })
            .then(function () {
                return driver.executeScript('return document.activeElement;')
                    .then(function(input) {
                        inputField = input;
                        return inputField.getAttribute('id');
                    })
            })
            .then(function (inputId) {
                // make sure input is focussed
                expect(inputId).to.equal('search');
            })
            .then(function () {
                return inputField.sendKeys('Hello')
                    .then(function () {
                        return inputField.getAttribute('value');
                    })
            })
            .then(function (inputValue) {
                expect(inputValue).to.equal('Hello');
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

    it('does not prevent typing anything else if field was autofocussed by page already', function (done) {
        var driver = this.driver();
        driver
            .get('http://0.0.0.0:3531/autofocus_input.html')
            .then(function (input) {
                return driver.executeScript('return document.activeElement;')
                    .then(function (input) {
                        return input.sendKeys('T')
                            .then(function () {
                                return input.getAttribute('value');
                            })
                    })

            })
            .then(function (inputValue) {
                expect(inputValue).to.equal('T');
                done();
            });

    });

});