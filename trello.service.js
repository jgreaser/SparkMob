angular
    .module('app')
    .factory('trelloService', trelloService);

trelloService.$inject = ['$rootScope'];


function trelloService($rootScope) {
    
    var vm = this;
    var myList = '57c6f164519b7aaffddf4bce';
    var authorized = false;

    var newCard = {
      name: 'New Test Card', 
      desc: 'This is the description of our new card.',
      // Place this card at the top of our list 
      idList: myList,
      pos: 'top'
    };


    var service = {
        message: message,
        checkAuthenticationOnLoad: checkAuthenticationOnLoad,
        getAuthorizedStatus: getAuthorizedStatus,
        authorize: authorize,
        submitCard: submitCard
    };

    return service;



    function checkAuthenticationOnLoad(){
       /* var success = function(){console.log("success");}

        Trello.get(  '/members/me/boards', success,function() { console.log("Failed to load boards"); });
*/
        
    }

    
    function authenticationSuccess (){
        console.log("Successful authentication"); 
        console.log("authorized was " + authorized);
        authorized =  true;
        console.log("authorized is now " + authorized);
        $rootScope.$digest();
    }

    function authenticationFailure () { 
        console.log("Failed authentication");
        authorized = false;
     };

     function authorize(){
        Trello.authorize({
              type: 'popup',
              name: 'Innovation Crowdsourcing',
              scope: {
                read: 'true',
                write: 'true' },
              expiration: '1hour',
              success: authenticationSuccess,
              error: authenticationFailure
            });
        
     }




    function submitCard(email, title, description){
        newCard.name = title;
        newCard.desc = "from: " + email + " , " + description;

        Trello.post('/cards/', newCard, creationSuccess);

    }


    function creationSuccess (data) {
      console.log('Card created successfully. Data returned:' + JSON.stringify(data));
    }


    function getAuthorizedStatus (){return authorized;}







    function message() {
         return "log text";
    }






    
}