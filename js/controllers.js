Arc.controller('arcCtrl', ($scope, elastic, esFactory) => {
  $scope.search = () => {
    elastic.search($scope.query)
    .then((data) => Object.assign($scope, data))
    .catch((err) => {
      $scope.error = err
      if (err instanceof esFactory.errors.NoConnections) {
        $scope.error = new Error(`Unable to connect to elasticsearch. Make sure that it is running and listening at ${CONFIG.host.host}`)
      }
    })
  }
})
