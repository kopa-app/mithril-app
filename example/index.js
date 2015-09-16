'use strict';

var m = require('mithril');
var mApp = require('../lib/mithril_app'); // do require('mithril-app') in your app

// set mithril's routing mode
m.route.mode = 'hash';

var main = mApp();

// add regular mithril components
main.use('/', {
  controller: function () {},
  view: function (ctrl) {
    return m('h1', 'Home');
  }
});

main.use('/greeting', {
  controller: function () {},
  view: function (ctrl) {
    return m('h1', 'Greetings earthlings');
  }
});

var dashboard = mApp();

dashboard.use('/dashboard', {
  controller: function () {},
  view: function (ctrl) {
    return m('h1', 'Dashboard');
  }
});

var user = mApp();

user.use('/account', {
  controller: function () {},
  view: function (ctrl) {
    return m('h1', 'My Account');
  }
});

// add other apps
main.use(dashboard);

// add other apps nested in a route
main.use('/user', user);

// now mount main app to DOM
main.mount(document.getElementById('app'));
