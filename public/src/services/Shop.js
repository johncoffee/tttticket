function Shop($http) {
    
    this.getAll = function () {
        return $http({
            method: "GET",
            url: "/api/shop.php",
            cache: true,
        })
        .then(function (result) {
            return result.data.tickets;
        });
    };
    
    this.getShopItem = function (shopItemID) {
        return this.getAll().then(function(shopItems) {
            var ticketData = null;

            for (var i in shopItems) {
                if (shopItems[i].id == shopItemID) {
                    ticketData = shopItems[i];
                    break;
                }
            }
            return ticketData;
        });
    };
}


angular.module("app").service("Shop", Shop);
