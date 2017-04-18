var Event = require('localStorage.js');

var storageManager = (function(){

	var storageList = {};

	function add(name){
	    var hander = new localStorage();
	    storageList[name] = hander;
	}

	function get(name, key){
		return storageList[name].get(key);
	}

	function set(name, key, value){
		return storageList[name].set(key);
	}

	function remove(name, key){
		return storageList[name].remove(key);
	}

	function load(){
		for(key in storageList){
			storageList[key].get();
		}
	}


	return {
		load: load,
		add: add,
		get: get,
		set: set,
		remove: remove
	}
})();

module.exports.storageManager = storageManager;