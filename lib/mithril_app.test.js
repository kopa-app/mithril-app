'use strict';

var expect = require('expect.js');
var mApp = require('./mithril_app');

function noop () {}

function view (content) {
  return function () {
    return content;
  };
}

describe('Mithril-App', function () {
  it('should allow creation of regular routes with components', function () {
    var app = mApp();

    var root = {
      controller: noop,
      view: view('root')
    };

    var foo = {
      controller: noop,
      view: view('foo')
    };

    var bar = {
      controller: noop,
      view: view('bar')
    };

    app.use('/', root);
    app.use('/foo', foo);
    app.use('/bar', bar);

    expect(app.routes).to.have.property('/');
    expect(app.routes['/']).to.be(root);
    expect(app.routes).to.have.property('/foo');
    expect(app.routes['/foo']).to.be(foo);
    expect(app.routes).to.have.property('/bar');
    expect(app.routes['/bar']).to.be(bar);
  });

  it('should allow usage of other apps.', function () {
    var app = mApp();
    var otherApp = mApp();

    var root = {
      controller: noop,
      view: view('root')
    };

    var foo = {
      controller: noop,
      view: view('foo')
    };

    var bar = {
      controller: noop,
      view: view('bar')
    };

    otherApp.use('/', root);
    otherApp.use('/foo', foo);
    otherApp.use('/bar', bar);
    app.use(otherApp);

    expect(app.routes).to.have.property('/');
    expect(app.routes['/']).to.be(root);
    expect(app.routes).to.have.property('/foo');
    expect(app.routes['/foo']).to.be(foo);
    expect(app.routes).to.have.property('/bar');
    expect(app.routes['/bar']).to.be(bar);
  });

  it('should allow usage of other apps nested in route.', function () {
    var app = mApp();
    var otherApp = mApp();

    var root = {
      controller: noop,
      view: view('root')
    };

    var foo = {
      controller: noop,
      view: view('foo')
    };

    var bar = {
      controller: noop,
      view: view('bar')
    };

    otherApp.use('/', root);
    otherApp.use('/foo', foo);
    otherApp.use('/bar', bar);
    app.use('/other', otherApp);

    expect(app.routes).to.have.property('/other');
    expect(app.routes['/other']).to.be(root);
    expect(app.routes).to.have.property('/other/foo');
    expect(app.routes['/other/foo']).to.be(foo);
    expect(app.routes).to.have.property('/other/bar');
    expect(app.routes['/other/bar']).to.be(bar);
  });
});
