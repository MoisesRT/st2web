'use strict';
angular.module('main')
  .config(function ($stateProvider) {

    // TODO: Fix order. Rules should go second in main menu.
    $stateProvider
      .state('rules', {
        abstract: true,
        url: '/rules',
        icon: 'st2-icon__rules',
        controller: 'st2RulesCtrl',
        templateUrl: 'apps/st2-rules/template.html',
        title: 'Rules',
        position: 3
      })
      .state('rules.list', {
        url: ''
      })
      .state('rules.general', {
        url: '/{id:\\w+}/general'
      })
      .state('rules.code', {
        url: '/{id:\\w+}/code'
      })

      ;

  });

angular.module('main')

  // List rules
  .controller('st2RulesCtrl', function ($scope, st2api, st2LoaderService) {

    $scope.filter = '';
    $scope.error = null;

    st2LoaderService.reset();
    st2LoaderService.start();

    var pRulesList = st2api.client.rules.list().then(function (result) {
      st2LoaderService.stop();
      return result;
    }).catch(function (err) {
      $scope.rules = [];
      $scope.error = err;

      console.error('Failed to fetch the data: ', err);
      st2LoaderService.stop();

      $scope.$apply();
    });

    var listUpdate = function () {
      pRulesList && pRulesList.then(function (list) {
        $scope.rules = list && _(list)
          .filter(function (e) {
            return e.name.indexOf($scope.filter) > -1;
          })
          .value();

        $scope.$apply();
      });
    };

    $scope.$watch('filter', listUpdate);

    $scope.$watch('$root.state.params.id', function (id) {
      var promise = id ? st2api.client.rules.get(id) : pRulesList.then(function (actions) {
        return _.first(actions);
      });

      promise.then(function (rule) {
        if (rule) {
          $scope.rule = rule;

          st2api.client.triggerTypes.get(rule.trigger.type).then(function (triggerTypes) {
            $scope.triggerSchema = triggerTypes.parameters_schema.properties;
            $scope.$apply();
          });

          st2api.client.actionOverview.get(rule.action.ref)
            .then(function (action) {
              $scope.actionSchema = action.parameters;
              $scope.$apply();
            });

          $scope.$apply();
        }
      });
    });

  })

  ;
