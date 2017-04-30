'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app views', function() {

    it('should automatically redirect to / when location hash/fragment is empty', function() {
        browser.get('index.html');
        expect(browser.getLocationAbsUrl()).toMatch("/");
    });

    describe('home view', function() {
        it('should automatically redirect to / when location /#/home', function() {
            browser.get('#/home');
            expect(browser.getLocationAbsUrl()).toMatch("/");
        });
    });

    describe('node view', function() {
        it('should automatically redirect to / when location /#/home', function() {
            browser.get('#/node');
            expect(browser.getLocationAbsUrl()).toMatch("/node");
        });
    });

    describe('python/django view', function() {
        it('should automatically redirect to /django when location /#/django', function() {
            browser.get('#/django');
            expect(browser.getLocationAbsUrl()).toMatch("/django");
        });
    });

    describe('game/unity view', function() {
        it('should automatically redirect to /django when location /#/unity', function() {
            browser.get('#/unity');
            expect(browser.getLocationAbsUrl()).toMatch("/unity");
        });

    });

    describe('angular view', function() {
        it('should automatically redirect to /angular when location /#/angular', function() {
            browser.get('#/angular');
            expect(browser.getLocationAbsUrl()).toMatch("/angular");
        });

    });
});

describe('home view', function() {
    beforeEach(function() {
        browser.get('#/home');
    });

    it('should filter the project list as a user types into the search box', function() {
        var projectList = element.all(by.repeater('project in projects'));
        var query = element(by.model('query'));

        expect(projectList.count()).toBe(4);

        query.sendKeys('Nodejs');
        expect(projectList.count()).toBe(1);

        query.clear();
        query.sendKeys('Django');
        expect(projectList.count()).toBe(1);

        query.clear();
        query.sendKeys('Angular');
        expect(projectList.count()).toBe(1);

        query.clear();
        query.sendKeys('Games');
        expect(projectList.count()).toBe(1);

    });

    it('should be possible to control project order via the drop down select box', function() {
        var projectNameColumn = element.all(by.repeater('project in projects').column('project.name'));
        var query = element(by.model('query'));

        function getNames() {
            return projectNameColumn.map(function(elm) {
                return elm.getText();
            });
        }

        element(by.model('orderProp')).element(by.css('option[value="name"]')).click();
        expect(getNames()).toEqual([
            "AngularJS",
            "Django",
            "Games",
            "NodeJS"
        ]);
    });

    it('should render project specific links', function() {
        var query = element(by.model('query'));

        query.sendKeys('nodeJS');
        element.all(by.css('.projects li a')).first().click();
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/node');
        });

        browser.get('#/home');
        query.sendKeys('Games');
        element.all(by.css('.projects li a')).first().click();
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/unity');
        });

        browser.get('#/home');
        query.sendKeys('Django');
        element.all(by.css('.projects li a')).first().click();
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/django');
        });

        browser.get('#/home');
        query.sendKeys('angular');
        element.all(by.css('.projects li a')).first().click();
        browser.getLocationAbsUrl().then(function(url) {
            expect(url).toEqual('/angular');
        });
    });

});

describe('node view', function() {
    beforeEach(function() {
        browser.get('#/node');
    });

    it('should filter the project list as a user types into the search box', function() {
        var projectList = element.all(by.repeater('project in nodes.projects'));
        var query = element(by.model('query'));

        expect(projectList.count()).toBe(1);

        query.sendKeys('Album');
        expect(projectList.count()).toBe(1);

    });

    it('should be possible to control project order via the drop down select box', function() {
        var projectNameColumn = element.all(by.repeater('project in nodes.projects').column('project.name'));
        var query = element(by.model('query'));

        function getNames() {
            return projectNameColumn.map(function(elm) {
                return elm.getText();
            });
        }

        element(by.model('orderProp')).element(by.css('option[value="name"]')).click();
        expect(getNames()).toEqual([
            "Album photos"
        ]);
    });
});

describe('games/unity view', function() {
    beforeEach(function() {
        browser.get('#/unity');
    });

    it('should filter the project list as a user types into the search box', function() {
        var projectList = element.all(by.repeater('project in games.projects'));
        var query = element(by.model('query'));

        expect(projectList.count()).toBe(1);

        query.sendKeys('Roll');
        expect(projectList.count()).toBe(1);
    });

    it('should be possible to control project order via the drop down select box', function() {
        var projectNameColumn = element.all(by.repeater('project in games.projects').column('project.name'));
        var query = element(by.model('query'));

        function getNames() {
            return projectNameColumn.map(function(elm) {
                return elm.getText();
            });
        }

        element(by.model('orderProp')).element(by.css('option[value="name"]')).click();
        expect(getNames()).toEqual([
            "Roll a ball"
        ]);
    });
});

describe('python/django view', function() {
    beforeEach(function() {
        browser.get('#/django');
    });

    it('should filter the project list as a user types into the search box', function() {
        var projectList = element.all(by.repeater('project in django.projects'));
        var query = element(by.model('query'));

        expect(projectList.count()).toBe(1);

        query.sendKeys('Blog');
        expect(projectList.count()).toBe(1);

    });


    it('should be possible to control project order via the drop down select box', function() {
        var projectNameColumn = element.all(by.repeater('project in django.projects').column('project.name'));
        var query = element(by.model('query'));

        function getNames() {
            return projectNameColumn.map(function(elm) {
                return elm.getText();
            });
        }

        element(by.model('orderProp')).element(by.css('option[value="name"]')).click();
        expect(getNames()).toEqual([
            "Blog"
        ]);
    });

});

describe('angular view', function() {
    beforeEach(function() {
        browser.get('#/angular');
    });

    it('should filter the project list as a user types into the search box', function() {
        var projectList = element.all(by.repeater('project in angular.projects'));
        var query = element(by.model('query'));

        expect(projectList.count()).toBe(1);

        query.sendKeys('Home');
        expect(projectList.count()).toBe(1);

    });


    it('should be possible to control project order via the drop down select box', function() {
        var projectNameColumn = element.all(by.repeater('project in angular.projects').column('project.name'));
        var query = element(by.model('query'));

        function getNames() {
            return projectNameColumn.map(function(elm) {
                return elm.getText();
            });
        }

        element(by.model('orderProp')).element(by.css('option[value="name"]')).click();
        expect(getNames()).toEqual([
            "Home Page"
        ]);
    });

});