
var vm = new Vue({
  el: '#app',
  data: {
    musics: []
  },
  ready: function() {
    var self = this;
    $.ajax({
      url: 'config.json',
      method: 'get',
      dataType: 'json',
      success: function(sources) {
        for(i = 0; i < sources.length; ++i) {
          self.musics.push({name: sources[i].name, url: sources[i].url, ans: 0});
        } 
      }
    });
  }
});

