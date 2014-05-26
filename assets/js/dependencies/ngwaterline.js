(function(Waterline,io) {

    if(io){
       io.sails.autoConnect = false;
    }
    //module
    var ngWaterline = angular.module('ngWaterline', []);

    var provide;

    ngWaterline.config(function($provide){
        provide = $provide;

    });
    //main provider
    ngWaterline.provider('$waterline', function() {

       // store stuff before instantation
        var _ontology = {
           adapterDefs: [],
           collectionDefs: [],
           connectionDefs: {}
        };

    //    factory which angular will instantiate
        function WaterlineFactory($injector, $q) {
           //boostraps waterline - see https://github.com/balderdashy/waterline/blob/browser/example/browser/usage/bootstrap.js
           function bootstrap(ontology) {

               console.log(ontology)
             //promise
             var bootstrappedWaterline = $q.defer();

             //set up adapters
             var adapters = {};
             ontology.adapterDefs.forEach(function(adapterDef,adapterConfig) {
               if (typeof adapterDef == 'string') {
                 adapterDef = $injector.get(adapterName);
                 angular.extend(adapterDef,adapterConfig || {});
                 adapters[adapterDef.identity] = adapterDef;
               }
             });

             //set up collections
             var instantiatedCollections = [];
             ontology.collectionDefs.forEach(function(def) {
               var _collectionProvider = {};
               //grab the constant from the injector
               if (typeof def == 'string') {
                 _collectionProvider.def = $injector.get(def);
               }
               _collectionProvider.collection = Waterline.Collection.extend(_collectionProvider.def)
               instantiatedCollections.push(_collectionProvider);
             });

             var waterline = new Waterline();

             instantiatedCollections.forEach(function(collection) {
               waterline.loadCollection(collection.collection);
             });

             waterline.initialize({
               adapters: adapters,
               connections: ontology.connectionDefs
             },
             function(err, initialized) {
               if (err) {
                 return bootstrappedWaterline.reject(err);
               }
               bootstrappedWaterline.resolve(waterline.collections);
             });
             return bootstrappedWaterline.promise

           }

           return bootstrap(_ontology).then(function(collections) {
             angular.forEach(collections, function(collection) {
               provide.factory(collection.provider,function(){
                 return collection;
               })

               //var ngCollection = $injector.get(collection.provider)
               //angular.extend(collection, ngCollection);
             })
             return collections;
           })
        }

//        function WaterlineFactory($injector,$q){
//            return {}
//        }
        //configuration functions
        function _registerCollection(collectionName) {
           _ontology.collectionDefs.push(collectionName);
        };

        function _registerAdapter(adapterName) {
           _ontology.adapterDefs.push(adapterName)
        };

        function _registerConnection(connectionConfig) {
           _ontology.connectionDefs[connectionConfig.identity] = connectionConfig;
        };



        return {
            '$get': ['$injector', '$q', WaterlineFactory],
            collection: _registerCollection,
            adapter: _registerAdapter,
            connection: _registerConnection
        }

    })




})(Waterline,io);