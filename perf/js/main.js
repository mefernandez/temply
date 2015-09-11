function graph(dataPath, canvasSelector) {
  $.getJSON(dataPath)
    .done(function(data){
      
      var labels = _.map(data, function(stats) { 
        return new Date(stats.start);
      });
      var avgResponseTime = ['avgResponseTime'].concat(
        _.map(data, function(stats) { 
          return stats.avg; 
        })
      );
      var minResponseTime = ['minResponseTime'].concat(
        _.map(data, function(stats) { 
          return stats.min; 
        })
      );
      var maxResponseTime = ['maxResponseTime'].concat(
        _.map(data, function(stats) { 
          return stats.max; 
        })
      );
      
      var chart = c3.generate({
        bindto: canvasSelector,
        data: {
          columns: [
            avgResponseTime,
            minResponseTime,
            maxResponseTime
          ]
        },
        axis: {
          x: {
              type: 'category',
              categories: labels
          }
        }
      });
    });  
}

$(function() {
  graph('/perf/data/home.json', '#home');
  graph('/perf/data/perf.json', '#perf');
});
