function MyTickets($q, Auth) {
    
    Object.defineProperties(this, {
        authenticated: {
            get: function () {
                return Auth.authenticated;
            }
        }
    });
    
    this.getMyTickets = function () {
        var tickets = [];
        
        if (this.authenticated) {
            tickets.push({
                name: "Nordic Game Jam",
            });
            tickets.push({
                name: "Copenhagen games festival",
            });
            tickets.push({
                name: "w00t",
            });    
        }
        
        return $q.when(tickets);
    };
}


angular.module("app").service("MyTickets", MyTickets);