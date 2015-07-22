(function(){
    angular.module("app").controller("mainOrderCtrl",["$scope", "dataService", function($scope, dataService){
        $scope.name = "";
        $scope.newProduct = "";
        $scope.products=[];
        $scope.plusProductValue = plusProductValue;
        $scope.minProductValue = minProductValue;
        $scope.addNewProduct = addNewProduct;
        $scope.sendOrder = sendOrder;
        $scope.notification = "";
        $scope.showNotification = false;
        $scope.notificationClass = "good_notification";

        activate();

        function activate(){
            getProducts();
        }

        function getProducts(){
            dataService.getProducts().then(function(data){
                $scope.products = data.data;
                console.log($scope.products);
            });
        }

        function plusProductValue(product){
            product.__v += 1;
        }

        function minProductValue(product){
            if(product.__v > 0)
                product.__v -= 1;
        }

        function addNewProduct(){
            if($scope.newProduct)
                $scope.products.push({
                    __v: 0,
                    name: $scope.newProduct,
                    id: 0
                });
        }

        function sendOrder(){
            $scope.showNotification = false;
           dataService.sendOrder($scope.products, $scope.name, successOrderSend, failedOrderSend);
        }

        function successOrderSend(){
            $scope.notification = "Order sent!";
            $scope.notificationClass = "good_notification";
            showNotification();
        }

        function failedOrderSend(){
            $scope.notification = "Order was not sent! Please try again.";
            $scope.notificationClass = "bad_notification";
            showNotification();
        }

        function showNotification(){
            $scope.showNotification = true;
        }
    }]);
})();
