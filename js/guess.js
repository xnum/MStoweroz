
var vm = new Vue({
  el: '#app',
  data: {
    url: '#',
    notifyText: '　',
    notifyStyle: {
      color: 'red',
      fontSize: '20px'
    },
    isHidden: true,
    options: [],
    ansText: ''
  },
  ready: function() {
    var self = this;
    $.ajax({
      url: 'config.json',
      method: 'get',
      dataType: 'json',
      success: function(sources) {
        for(i = 0; i < sources.length; ++i) {
          self.options.push({name: sources[i].name, url: sources[i].url, ans: 0});
        } 
      }
    });
  },
  methods: {
    createProblem: function() {
      var index = Math.floor((Math.random() * this.options.length));
      for(i = 0; i < this.options.length; ++i) {
        this.options.ans = 0;
      }

      this.options[index].ans = 1;
      this.url = this.options[index].url;
      this.ansText = this.options[index].name;
      this.notifyText = '　';
      this.isHidden = false;
    },
    selectProblem: function(index) {
      if(this.options[index].ans == "1") {
        this.notifyStyle.color = 'blue';
        this.notifyText = '正確答案';
      }
      else {
        this.notifyStyle.color = 'red';
        this.notifyText = '答錯了';
      }
    },
    showAnswer: function() {
      for(i = 0; i < this.options.length; ++i) {
        this.notifyStyle.color = 'green';
        this.notifyText = this.ansText;
      }
    }
  }
})
