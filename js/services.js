Arc.service('client', function (esFactory) {
  return esFactory({
    host: CONFIG.host,
    log: 'trace'
  })
})

Arc.factory('elastic', function ($q, client) {
  const search = function (query, offset = 0) {
    let deferred = $q.defer()

    client.search({
      index: CONFIG.index,
      type: CONFIG.type,
      body: {
        size: CONFIG.size,
        from: offset,
        query: {
          query_string: {
            query: query
          }
        }
      }
    })
    .then((res) => deferred.resolve({ timeTook: res.took, hitsCount: res.hits.total, hits: res.hits.hits, error: null }))
    .catch((err) => deferred.reject(err))

    return deferred.promise
  }

  return { search }
})
