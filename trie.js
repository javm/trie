/*
* TRIE implementation in Javascript for node.js
* Based on https://github.com/odhyan/trie
*/

function Trie(){
  this.words = 0;
  this.prefixes = 0;
  this.children = {};
}

var trie = Trie.prototype;


/*
 * Insert a word into the dictionary. 
 * Recursively traverse through the trie nodes, and create new node if does not already exist.
 *
 * @method insert
 * @param {String} str Word to insert in the dictionary
 * @param {Integer} pos Current index of the string to be inserted
 * @return {Void}
 */

trie.insert = function(str, pos){

  if(str.length == 0) { //blank string cannot be inserted
    return;
  }

  var T = this,
      k, //Current character
      child; //Current node

  if(pos === undefined) {
    pos = 0;
  }
  if(pos === str.length) {
    T.words ++;
    return;
  }

  T.prefixes ++;
  k = str[pos];
  if(T.children[k] === undefined) { //if node for this char doesn't exist, create one
    T.children[k] = new Trie();
  }
  child = T.children[k];
  //Recursive call
  child.insert(str, pos + 1);
};


trie.remove = function(str, pos){
  if(str.length == 0) {
    return;
  }

  var T = this,
      k,
      child;

  if(pos === undefined) {
    pos = 0;
  }
  if(T === undefined) {
    return;
  }
  if(pos === str.length) {
    T.words --;
    return;
  }

  T.prefixes --;
  k = str[pos];
  child = T.children[k];
  child.remove(str, pos + 1);
};


trie.update = function(strOld, strNew){
  if(strOld.length == 0 || strNew.length == 0) {
    return;
  }
  this.remove(strOld);
  this.insert(strNew);
};

trie.countWord = function(str, pos) {
  if(str.length == 0) {
    return 0;
  }

  var T = this,
      k,
      child,
      words = 0;

  if(pos === undefined) {
    pos = 0;
  }
  if(pos === str.length) {
    return T.words;
  }
  k = str[pos];
  child = T.children[k];
  if(child !== undefined) { //node exists
    words = child.countWord(str, pos + 1);
  }
  return words;
};

/*
 * Count the number of times a given prefix exists in the dictionary
 *
 * @method countPrefix
 * @param {String} str Prefix to get count of
 * @param {Integer} pos Current index of the given prefix
 * @return {Integer} The number of times a given prefix exists in the dictionary
 */

trie.countPrefix = function(str, pos) {
  if(str.length == 0) {
    return 0;
  }

  var T = this,
      k,
      child,
      prefixes = 0;

  if(pos === undefined) {
    pos = 0;
  }
  if(pos === str.length) {
    return T.prefixes;
  }
  k = str[pos];
  child = T.children[k];
  if(child !== undefined) { //node exists
    prefixes = child.countPrefix(str, pos + 1); 
  }
  return prefixes;
};

/*
 * Find a word in the dictionary
 *
 * @method find
 * @param {String} str The word to find in the dictionary
 * @return {Boolean} True if the word exists in the dictionary, else false
 */
trie.find = function(str) {
  if(str.length == 0) {
    return false;
  }

  if(this.countWord(str) > 0) {
    return true;
  } else {
    return false;
  }
};

/*
 * Get all words in the dictionary
 *
 * @method getAllWords
 * @param {String} str Prefix of current word
 * @return {Array} Array of words in the dictionary
 */
trie.getAllWords = function(str) {
  var T = this,
      k,
      child,
      ret = [];
  if(str === undefined) {
    str = "";
  }
  if(T === undefined) {
    return [];
  }
  if(T.words > 0) {
    ret.push(str);
  }
  for(k in T.children) {
    child = T.children[k];
    ret = ret.concat(child.getAllWords(str + k));
  }
  return ret;
};


/*
 * Autocomplete a given prefix
 *
 * @method autoComplete
 * @param {String} str Prefix to be completed based on dictionary entries
 * @param {Integer} pos Current index of the prefix
 * @return {Array} Array of possible suggestions
 */

trie.autoComplete = function(str, pos) {
  if(str.length == 0) {
    return [];
  }

  var T = this,
      k,
      child;

  if(pos === undefined) {
    pos = 0;
  }
  k = str[pos];
  child = T.children[k];
  if(child === undefined) { //node doesn't exist
    return [];
  }
  if(pos === str.length - 1) {
    return child.getAllWords(str);
  }
  return child.autoComplete(str, pos + 1);
};

module.exports = Trie;
