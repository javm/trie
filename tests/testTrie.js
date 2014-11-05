var expect = require('expect.js');
var Trie = require('../trie');

describe('Trie', function(){
  var trie;
  before(function(done){
    trie = new Trie();
    trie.insert("hello");
    trie.insert("hell");
    trie.insert("Hello");
    done();
  });
  describe('insert', function(){
    it('should insert a string in the tries', function(done){
      trie.insert("hook");
      trie.insert("home");
      done();
    });
  });

  describe('autocomplete', function(){
    it("should get the words with string prefix 'he'", function(done){
      var res = trie.autoComplete("he");
      expect(res.length).to.be.above(0);
      expect(res.indexOf("hello")).to.be.above(-1);
      expect(res.indexOf("hell")).to.be.above(-1);
      done();
    });
  });

});
