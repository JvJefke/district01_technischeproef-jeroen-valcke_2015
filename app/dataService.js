(function(){
    angular.module("app").factory("dataService",["$http", "$q", function($http, $q){
        var service = {
            getProducts: getProducts,
            sendOrder: sendOrder,
            getBestellingen: getBestellingen,
            addNewProduct: addNewProduct,
            deleteProduct: deleteProduct,
            changeProduct: changeProduct
        };

        return service;

        function changeProduct(){
            // tobeimplemented
        }

        // Service functions

        function getProducts(){
            return $http.get("http://imd.district01.be/product");
        }

        function sendOrder(products, name, callback, errCalback){
            filteredProducts = getFilteredProducts(products);

            console.log(filteredProducts);

            if(name && filteredProducts.length > 0) {
                $http.post(
                    "http://imd.district01.be/order",
                    {
                        "username": name,
                        "products": filteredProducts
                    }
                ).success(callback);
            }else{
                errCalback();
            }
        }

        function getBestellingen(){
            return $http.get("http://imd.district01.be/order");
        }

        function deleteProduct(product){
            return $http.delete("http://imd.district01.be/product/" + product._id)
        }

        function addNewProduct(name){
            return $http.post("http://imd.district01.be/product",{
                "name" : name
            });
        }

        // Local functions

        function getFilteredProducts(products){
            var returnIndex = [];

            for(var i in products){
                if(products[i].__v > 0){
                    products[i].quantity = products[i].__v;
                    returnIndex.push(products[i]);
                }
            }

            return returnIndex;
        }
    }]);
})();