'use strict';

describe('Test dictionary module services', function() {

  // load modules
  beforeEach(module('myApp'));

  // Test dictionary service availability
  it('check the existence of dictionary service', inject(function(dictionary) {
      
    expect(dictionary).toBeDefined();
  }));
});