'use strict';

describe('Test language detection module services', function() {

  // load modules
  beforeEach(module('myApp'));

  // Test language detection service availability
  it('check the existence of language detection service', inject(function(languageDetection) {
    console.log("languageDetection: ", languageDetection);
    expect(languageDetection).toBeDefined();
  }));

  it('should be english text', inject(function(languageDetection) {
    expect(languageDetection.detect('Hello world')).toBe('english');
    
  }));

  it('should be english text', inject(function(languageDetection) {
    expect(languageDetection.detect('A major superannuation group says giving Australians more flexibility to use their retirement savings could impede the ability of funds to invest in large, nation-building infrastructure projects.'))
      .toBe('english');
    
  }));

  it('should be french text', inject(function(languageDetection) {
    expect(languageDetection.detect('Le Premier ministre français, Manuel Valls, s’est montré offensif dimanche contre le Front National et sa montée dans les sondages.'))
      .toBe('french');
    
  }));

  it('should be german text', inject(function(languageDetection) {
    expect(languageDetection.detect('Wer seine Vorhaben in der Politik umsetzen will, braucht Talent zur Inszenierung.'))
      .toBe('german');
    
  }));


});