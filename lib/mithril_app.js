'use strict';

var m = require('mithril');

module.exports = function () {
  var app = {};
  app.routes = {};
  app._isMithrilApp = true;

  function argsToArray(args) {
    return Array.prototype.slice.call(args);
  }

  function isApp(val) {
    return typeof val === 'object' &&
           val._isMithrilApp;
  }

  function isObject(val) {
    return typeof val === 'object' &&  Object.prototype.toString.call(val) === '[object Object]';
  }

  function isComponent(val) {
    return typeof val === 'object' &&
           typeof val.controller === 'function' &&
           typeof val.view === 'function';
  }

  function joinRoutes() {
    var routes = argsToArray(arguments);

    var route = ('/' + routes.join('/')).replace(/(\/+)/g, '/');

    // strip last '/'
    if (route.length > 1 && route.substr(-1) === '/') {
      return route.substr(0, route.length - 1);
    }

    return route;
  }

  function useAppAt(route, childApp) {
    // merge apps routes into our own routes
    if (childApp.routes) {
      Object.keys(childApp.routes).forEach(function (childRoute) {
        useComponentAt(joinRoutes(route, childRoute), childApp.routes[childRoute]);
      });
    }
  }

  function useComponentAt(route, component) {
    app.routes[route] = component;
  }

  app.use = function (/*[route, app/component] */) {
    var args = argsToArray(arguments);

    // another app got passed
    if (args.length === 1) {
      if (isApp(args[0])) {
        useAppAt('/', args[0]);
        return;
      }

      if (isObject(args[0])) {
        Object.keys(args[0]).map(function(route) {
          app.use(route, args[0][route]);
        });
        return;
      }

      throw new Error('You must provide another mithril app or a hash of routes/mithril-components as single argument.');
    }
    // a route + app/component got passed
    else if (args.length >= 2) {
      if (typeof args[0] !== 'string') {
        throw new Error('You must provide a route as first argument.');
      }

      if (isApp(args[1])) {
        useAppAt(args[0], args[1]);
      } else if (isComponent(args[1])) {
        useComponentAt(args[0], args[1]);
      } else {
        throw new Error('You must provide a mithril-app or mithril-component as second argument.');
      }
    }
  };

  app.mount = function (el, defaultRoute) {
    if (!el) {
      throw new Error('You must provide a DOM-Element as first argument.');
    }

    defaultRoute = defaultRoute || '/';

    if (typeof defaultRoute !== 'string') {
      throw new Error('You must provide a default route as second argument.');
    }

    m.route(el, defaultRoute, app.routes);
  };

  return app;
};
