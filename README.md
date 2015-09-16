[![Build Status](https://travis-ci.org/kopa-app/mithril-app.svg?branch=master)](https://travis-ci.org/kopa-app/mithril-app)

# Mithril-App

Composable apps for [Mithril.js](https://github.com/lhorie/mithril.js).

Create self contained mithril apps that can be nested into each other.

## Usage

```javascript
var m = require('mithril');
var mApp = require('mithril-app');

// set mithril's routing mode
m.route.mode = 'hash';

// pass mithril to main app,
// to ensure its using the same mithril as you required
var main = mApp(m);

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
```

You shoud now have the following routes:

- `/` > Home
- `/greeting` > Greetings earthlings
- `/dashboard` > Dashboard
- `/user/account` > My Account
