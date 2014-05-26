angular.module('app',['app.config','app.templates','ui.router','ngWaterline'])
    .config(function($stateProvider,$urlRouterProvider,$waterlineProvider){

        console.log($waterlineProvider)
    //add basic states

    //abstract home state
    $stateProvider.state('app',{
        //controller: 'appController',
        template: '<div ui-view></div>',
    });

    //child state
    $stateProvider.state('app.home',{
        //controller: 'homeController',
        url: '/',
        templateUrl: 'templates/app.html'
    });




    //configure waterline stuff

    // //register externally configured module
    // $waterlineProvider.collection('UserModel');

    $waterlineProvider.adapter({
       identity : 'waterlineHttp',
       host: 'http://localhost:1337'
    });

    // //TODO: use newer build of Waterline
    // $waterline.connection({
    //   identity: 'myAPI',
    //   adapter: 'waterlineHttp',

    // })

}).run(function($state,$timeout){

        $timeout(function(){
            $state.go('app.home')
        },1500)

    })
