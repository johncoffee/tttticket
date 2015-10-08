(function(){
  'use strict';

  angular.module('app')
         .service('userService', ['$q', UserService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function UserService($q){
    var users = [
      {
        name: 'Schedule',
        avatar: 'svg-1',
      },
      {
        name: 'Tickets',
        visibleFrom: new Date(),
        visibleTo: new Date(),
        avatar: 'svg-2',
      },
    ];

    // Promise-based API
    return {
      loadAllUsers : function() {
        // Simulate async nature of real remote calls
        return $q.when(users);
      }
    };
  }

})();
