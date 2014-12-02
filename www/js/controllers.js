angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

// .controller('AccountCtrl', function($scope) {
// })

.controller('ThingsCtrl', function($scope) {
})

.controller('AccountCtrl', function($scope, $ionicModal, $timeout, $rootScope, $http, $state) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.newexp = {};
  $scope.newexp.date = Date.now();
  //$scope.newexp.category_id = 7;

  
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });



  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    if(!$rootScope.logged){
      $scope.modal.show();
    }else{
      alert("Ya estas logeado");
    }    
  };
  $scope.logout = function() {
        $rootScope= {};
  };


  $scope.sendExpense = function(my_newexp) {
  
        $http.defaults.headers.common['Authorization'] = $rootScope.cd;
        $http.post('http://pepetox.com:3000/expenses.json', my_newexp).
          then(function(res){          
            $scope.newexp = {};
            $scope.newexp.date = Date.now();
            alert("Envio realizado con exito");
            $http.get('http://pepetox.com:3000/expenses.json').
            then(function(res){           
              $rootScope.expenses = res.data;   
            }); 
        });     

  };


  // Perform the login action when the user submits the login form
  $scope.doLogin = function(user, password) {
    console.log('Doing login', $scope.loginData);   

 // Create Base64 Object
      var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
      var string = user+':'+password;
      
      // Encode the String
      var encodedString = Base64.encode(string);
      var basicEncoding =  "Basic " + encodedString;        
      $http.defaults.headers.common['Authorization'] = basicEncoding;
      
      $http.get('http://pepetox.com:3000/expenses.json').
      then(function(res){          
        //$scope.loadCategories();
        $rootScope.expenses = res.data;    
        $rootScope.cd = basicEncoding;  
        $rootScope.logged = true;   
        //alert("cargando catw");
        $http.get('http://pepetox.com:3000/categories.json').
         then(function(res){          
          $rootScope.categories = res.data; 
          //alert($rootScope.categories);   
           $scope.modal.hide();
           $state.go('app.playlists', {}, {reload: true});
        });  

      });    
     
  };
});
