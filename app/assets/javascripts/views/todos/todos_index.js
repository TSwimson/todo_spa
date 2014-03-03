SpaApp.Views.TodosIndex = Backbone.View.extend({
  events: {
    'submit #addTodo'      :'add_todo',
  },
  id: 'todos',
  template: HandlebarsTemplates['todos/index'],

  render: function() {
    $(this.el).html(this.template());

    _.each(this.collection, function (someTodo) {
      var todoView = new SpaApp.Views.TodosShow({model: someTodo});
      this.$el.append(todoView.render().el);
    }, this);

    $('#addTodo').on('submit', function(event) {
      event.preventDefault();

    });
    return this;
  },

  add_todo: function(event) {
    var _this = this;
    event.preventDefault();
    if ($('#todo_title').val().length > 0) {
      var new_todo = {
        title: $('#todo_title').val(),
        completed: false
      };
      $.ajax({
        method: 'post',
        url   : '/todos.json',
        data  : {todo: new_todo}
      }).done(function(responseData){
        $('#todo_title').val('');
        var todoView = new SpaApp.Views.TodosShow({model: responseData});
        _this.$el.append(todoView.render().el);
      });
    }
  }
});
