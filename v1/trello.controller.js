angular
    .module('app')
    .controller('trelloController', trelloController);

trelloController.$inject = ['trelloService', '$scope'];

function trelloController(trelloService, $scope) {

    var vm = this;

    vm.email = '';
    vm.ideaTitle = '';
    vm.ideaDescription = '';

    vm.submitted = false;
    vm.authorized = trelloService.getAuthorizedStatus;

    vm.message = trelloService.message();
    
    vm.submit = submit;
    vm.resetSubmission = resetSubmission;
    vm.authorize = authorize;

   
    $scope.$watch(trelloService.getAuthorizedStatus, function(){
        console.log("authorized changed");
        //vm.authorized = trelloService.getAuthorizedStatus();
        console.log(trelloService.getAuthorizedStatus());
    });

    //trelloService.checkAuthenticationOnLoad();

    function authorize (){
       trelloService.authorize();        
    }

    function submit($event) {
          // our function body
          $event.preventDefault();
          console.log("submit");
          console.log(vm.email + " " + vm.ideaTitle + " " + vm.ideaDescription);
          trelloService.submitCard(vm.email,vm.ideaTitle,vm.ideaDescription);
          vm.submitted = true;
        }


    function resetSubmission (){
        vm.email = '';
        vm.ideaTitle = '';
        vm.ideaDescription = '';

        vm.submitted = false;
    }




}