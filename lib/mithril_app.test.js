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
  var app, otherApp, root, foo, bar;

  beforeEach(function() {
    app = mApp();
    otherApp = mApp();

    root = {
      controller: noop,
      view: view('root')
    };

    foo = {
      controller: noop,
      view: view('foo')
    };

    bar = {
      controller: noop,
      view: view('bar')
    };
  });

  it('should allow creation of regular routes with components', function () {
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

  it('should allow to add multiple routes at once.', function () {
    otherApp.use('bar', bar);
    app.use({
      '/': root,
      '/foo': foo,
      '/other': otherApp
    });

    expect(app.routes).to.have.property('/');
    expect(app.routes['/']).to.be(root);
    expect(app.routes).to.have.property('/foo');
    expect(app.routes['/foo']).to.be(foo);
    expect(app.routes).to.have.property('/other/bar');
    expect(app.routes['/other/bar']).to.be(bar);
  });

  it('should do nothing when called with no argument', function() {
    app.use('/', root);
    app.use();
    expect(app.routes).to.have.property('/');
    expect(app.routes['/']).to.be(root);
  });

  describe('1 argument', function() {
    it('should throw when called numbner as only argument', function() {
      expect(function() {
        app.use(1);
      }).to.throwError();
    });

    it('should throw when called array as only argument', function() {
      expect(function() {
        app.use([]);
      }).to.throwError();
    });

    it('should throw when called string as only argument', function() {
      expect(function() {
        app.use('foo');
      }).to.throwError();
    });
  });

  describe('2 arguments', function() {
    it('should throw when called with non string as first argument', function() {
      expect(function() {
        app.use(otherApp, otherApp);
      }).to.throwError();
    });
    it('should throw when called with non component/app as second argument', function() {
      expect(function() {
        app.use('foo', 'bar');
      }).to.throwError();
    });
  });
});
