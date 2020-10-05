// Code goes here

var myApp = angular.module('myApp', []);
myApp.controller('productController', ['$scope', '$http', function($scope, $http) {

  //Buttons Settings
  $scope.submit = true;
  $scope.update = false;
  $scope.cancel = false;
  $scope.productid = true;

 console.log($scope.user);
 
 /*localhost:3000/user/login
Json:-
{
	"email":"phukamthakur89@gmail.com",
	"password":"hukam0123"
	
}
*/
 //Login
  $scope.userlogin = function() {
	  
    //$http GET function use to post/get data through browser from nodejs.
    $http({
      method: 'GET',
      url: 'http://localhost:3000/user/login',
	  data: JSON.stringify($scope.user),
      //data: $scope.user
	  //data: JSON.stringify(requestData),
	  

    }).then(function successCallback(response) {

      //$scope.users.push(response.data);
      alert("User login successfully")

    }, function errorCallback(response) {

      alert("Hi Error. while created user Try Again!");

    });

  };
  

 
  
  //Getting Products List
  //$http GET function use to post/get data through browser from nodejs.
  $http({
    method: 'GET',
    url: 'http://localhost:3000/products'

  }).then(function successCallback(response) {
	// Return data with product array 
	$scope.products = response.data;

  }, function errorCallback(response) {

    alert("Error. Try Again!");

  });


  //Create New product
  $scope.createProducts = function() {
	  
    //$http GET function use to post/get data through browser from nodejs.
    $http({
      method: 'POST',
      url: 'http://localhost:3000/products/',
      data: $scope.product

    }).then(function successCallback(response) {

      //$scope.users.push(response.data);
      alert("product has created Successfully")

    }, function errorCallback(response) {

      alert("Error. while created user Try Again!");

    });

  };


  //Update User
  $scope.updateProduct = function() {	
    //$http PUT function
    $http({

	method: 'PUT',
	url: 'http://localhost:3000/products/' + $scope.product._id,
	data: $scope.product
		
    }).then(function successCallback(response) {

      alert("User has updated Successfully")

    }, function errorCallback(response) {

      alert("Error. while updating user Try Again!");

    });

  };


  //Delete product
  $scope.deleteProduct = function(product) {
	  
    //$http DELETE function
    $http({

      method: 'DELETE',
      url: 'http://localhost:3000/products/' + product._id

    }).then(function successCallback(response) {

      alert("Product has deleted Successfully");
      var index = $scope.productlist.indexOf(product);
      $scope.productlist.splice(index, 1);

    }, function errorCallback(response) {

      alert("Error. while deleting product Try Again!");

    });

  };

  //Set $scope on Edit button click
  $scope.editProduct = function(product) {

    $scope.product = product;
    $scope.submit = false;
    $scope.update = true;
    $scope.cancel = true;
    $scope.productid = true;

  };


  //cancel Uodate
  $scope.cancelUpdate = function() {
    $scope.user = null;
    $scope.submit = true;
    $scope.update = false;
    $scope.cancel = false;
    $scope.productid = true;
  };

  //////////////////Shortcut methods for $http//////

  //$http GET
  //$http.get('https://jsonplaceholder.typicode.com/users', function successCallback(response) {
  //
  //  alert("User has updated Successfully")
  //
  //}, function errorCallback(response) {
  //
  //  alert("Error. while updating user Try Again!");
  //
  //});


  //$http POST
  //$http.post('https://jsonplaceholder.typicode.com/users', $scope.user, function successCallback(response) {
  //
  //  $scope.users.push(response.data);
  //alert("User has created Successfully")
  //
  //}, function errorCallback(response) {
  //
  //  alert("Error. while created user Try Again!");
  //
  //});


  //$http PUT
  //$htp.put('https://jsonplaceholder.typicode.com/users/' + $scope.user.id, $scope.user, function successCallback(response) {
  //
  //  alert("User has updated Successfully")
  //
  //}, function errorCallback(response) {
  //
  //  alert("Error. while updating user Try Again!");
  //
  //});


  //$http DELETE
  //$http.delete('https://jsonplaceholder.typicode.com/users/' + user.id, function successCallback(response) {
  //
  //  alert("User has deleted Successfully");
  //var index = $scope.users.indexOf(user);
  //$scope.users.splice(index, 1);
  //
  //  }, function errorCallback(response) {
  //
  //  alert("Error. while deleting user Try Again!");
  //
  //  });


}]);



















/* Working  //angular code
var app = angular.module('app', []);
app.controller('appControllerGet', function($scope, $http) {	
	 	  
	$http.get("/products")
	.then(function(response) {
	$scope.myWelcome = response.data;
	});

});

 app.controller('appControllerPost', function($scope, $http) {	
	  
	$scope.submit= function(){
	  var data = $.param({
		book: JSON.stringify({
			name: $scope.name,
			price : $scope.price,
			body : $scope.body
		})
	  });
	  
	  console.log(data);

	  $http.post("/user/signup", data).success(function(data, status) {
		console.log('Data posted successfully');
	  })

	}; 

});  */


