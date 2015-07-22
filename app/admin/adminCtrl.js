(function(){
    angular.module("app").controller("adminCtrl",["$scope", "dataService", function($scope, dataService){
        $scope.showProducten = true;
        $scope.producten = [];
        $scope.bestellingen = [];
        $scope.changeTab = changeTab;
        $scope.isProductActive = "tab_active";
        $scope.isOrderActive = "";
        $scope.newProduct ="";
        $scope.addNewProduct = addNewProduct;
        $scope.deleteProduct = deleteProduct;
        $scope.editProduct = editProduct;
        $scope.changeProduct = changeProduct;

        activate();

        function activate(){
            getProducts();
            getOrders();
        }

        function getProducts(){
            dataService.getProducts().then(function (data) {
                $scope.producten = data.data;
            });
        }

        function getOrders(){
            dataService.getBestellingen().then(function(data){
                $scope.bestellingen = data.data;
            });
        }

        function changeTab(val){
            if(val){
                $scope.isProductActive = "tab_active";
                $scope.isOrderActive = "";
            }else{
                $scope.isOrderActive = "tab_active";
                $scope.isProductActive = "";
            }
            $scope.showProducten = val;
        }

        function addNewProduct(){
            if($scope.newProduct){
                dataService.addNewProduct($scope.newProduct).success(function(){
                    getProducts();
                });
            }

        }

        function deleteProduct(product, index){
            if(product){
                dataService.deleteProduct(product).success(function(){
                    $scope.producten.splice(index, 1);
                });
            }
        }

        function editProduct(product){
            product.show = true;
        }

        function changeProduct(product){
            product.show = false;
        }
    }]);
})();