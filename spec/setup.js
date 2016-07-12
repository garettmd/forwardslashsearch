var chromedriver = require('chromedriver');
var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    chromeOptions = new chrome.Options;


chromeOptions.addArguments("load-extension=" + __dirname + "/../extension");
var StaticServer = require('static-server');
var port = 3531;

var server = new StaticServer({
    rootPath: __dirname + '/fixtures',
    port: port,
});


before(function (done) {
    server.start(function () {
        chromedriver.start();

        var driver = new webdriver.Builder()
            .forBrowser('chrome')
            .usingServer('http://localhost:9515')
            .setChromeOptions(chromeOptions);

        var builtDriver;

        // I have no clue, why calling `build` right here causes the driver not to work later on
        // doing it on demand in a function seems to work
        // race condition?
        this.driver = function() {
            if (!builtDriver) {
                builtDriver = driver.build();
            }
            return builtDriver;
        };

        done();
    }.bind(this));
});

after(function (done) {
    this.driver().quit().then(function () {
        chromedriver.stop();
        done();
    });
});