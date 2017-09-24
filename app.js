(function (){
'use strict';

angular.module('ShoppingListCheckOffApp', [])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController(ShoppingListCheckOffService){
	var buyList = this;
	buyList.items =   ShoppingListCheckOffService.getBuyItems();
  	buyList.boughtItem = function(index) {
    ShoppingListCheckOffService.boughtItem(index);
    buyList.error = ShoppingListCheckOffService.checkIfAllItemsBought();
  }
}

function AlreadyBoughtController (ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.checkError = function() {
    return ShoppingListCheckOffService.checkIfNoItemBought();
    }
  boughtList.items =  ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var toBuyItems = [{ name : "Cookies", quantity : "10"}, { name : "Chocolates", quantity : "15"}, { name : "Cake", quantity : "20"}, { name : "Eggs", quantity : "10"}, { name : "Bread", quantity : "15"} ];
  var boughtItems = [];

  service.getBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

  service.boughtItem = function (index) {
    var item = toBuyItems[index];
    boughtItems.push(item);
    toBuyItems.splice(index, 1);
  }

  service.checkIfAllItemsBought = function () {
    if (!toBuyItems.length)
      return 1;
    else
      return 0;
  }

  service.checkIfNoItemBought = function () {
    if (!boughtItems.length)
      return 1;
    else
      return 0;
  }
}
})();