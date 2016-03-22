angular.module('imageID.services', []).service('MemoryService',['$q', function($q) {
	  var memory = {};
	  return {
		  putData: function(key, data){
			  memory[key] = data;
		  },
		  getData: function(key){
			  return memory[key];
		  }
	  };
}]);