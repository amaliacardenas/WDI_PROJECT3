angular.module('dogPark')
       .controller('UsersController', UsersController);

UsersController.$inject = ['$resource', 'tokenService'];
function UsersController($resource, tokenService) {
  var self = this;


  var User = $resource('http://localhost:8000/users/:id', { id: '@_id' }, { update: {method: "PATCH"}});
  var Pet  = $resource('http://localhost:8000/pets/:id', { id: '@_id' }, { update: {method: "PATCH"}});

  this.user = {};
  this.pet = {};

  this.currentUser = tokenService.getUser();

  this.all = User.query();

  this.selectUser = function(user) {
    console.log("click");
    self.selectedUser = User.get({ id: user._id });
  }
 
  this.addPet = function(){

    this.pet.userId = this.currentUser._id;

    Pet.save(this.pet, function(pet) {
      console.log('save');
      self.all.push(pet);
      self.pet = {};
    });
  }

  this.editUser = function(user){
    self.user = user;
  }

  this.deleteUser = function(user){
    User.delete({id: user._id});
    var index = self.all.indexOf(user);
    self.all.splice(index, 1);
  }
}