'use strict';

// Create the Socket.io wrapper service
angular.module('core').service('ListHelpers', ['$modal', 'ngTableParams', '$filter', 'ContextMenuService',
    function($modal, ngTableParams, $filter, ContextMenuService) {
        return {
            editModal: function(singular, plural, cb) {
                return function(item) {
                    var modalInstance = $modal.open({
                        templateUrl: '/modules/' + plural + '/views/edit-' + singular + '-modal.client.view.html',
                        controller: 'Edit' + singular.charAt(0).toUpperCase() + singular.slice(1) + 'Controller',
                        resolve: {
                            item: function() {
                                return item;
                            }
                        }
                    });

                    modalInstance.result.then(function(result) {
                        if (cb) {
                            cb(arguments);
                        } else {
                            // TopAlert.alert('Success:', 'Article has been added.');
                        }
                    });
                };
            }, 

            addModal: function(singular, plural, cb) {
                return function() {
                    var modalInstance = $modal.open({
                        templateUrl: '/modules/' + plural + '/views/add-' + singular + '-modal.client.view.html',
                        controller: 'Add' + singular.charAt(0).toUpperCase() + singular.slice(1) + 'Controller',
                        resolve: {
                            
                        }
                    });

                    modalInstance.result.then(cb);
                };
            },

            tableParams: function(items) {
                return new ngTableParams( // jshint ignore:line
                    angular.extend({ page: 1, count: 25, sorting: { name: 'asc' }}), {
                        total: items.length,
                        getData: function($defer, params) {
                            var filteredData = params.filter() ?
                               $filter('filter')(items, params.filter()) :
                               items;
                            var orderedData = params.sorting() ?
                                $filter('orderBy')(filteredData, params.orderBy()) :
                                filteredData;
                            params.total(orderedData.length);
                            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        }
                    }
                );
            },
        };
    }
]);
