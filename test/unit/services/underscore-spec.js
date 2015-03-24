'use strict';

describe('Test underscore module services', function() {

  // load modules
  beforeEach(module('myApp'));

  // Test underscore service availability
  it('check the existence of underscore service', inject(function(_) {
      
    expect(_).toBeDefined();
  }));
});