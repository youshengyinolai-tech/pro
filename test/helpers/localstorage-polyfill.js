/* state.js expects a browser-like localStorage global. Node has no such
   global by default (only behind --experimental-webstorage + a file path),
   so tests install a minimal in-memory stand-in before state.js is imported. */
if(typeof globalThis.localStorage === 'undefined'){
  var store = new Map();
  globalThis.localStorage = {
    getItem: function(key){ return store.has(key) ? store.get(key) : null; },
    setItem: function(key, value){ store.set(key, String(value)); },
    removeItem: function(key){ store.delete(key); },
    clear: function(){ store.clear(); }
  };
}
