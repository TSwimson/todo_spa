SpaApp.Views.TodosIndex = Backbone.View.extend({
  events: {
    'submit #addTodo'   :'add_todo',
    'click #removeTodo':'remove_todo'
  },
  id: 'todos',
  template: HandlebarsTemplates['todos/index'],

  render: function() {
    $(this.el).html(this.template());

    _.each(this.collection, function (someTodo) {
      var todoHTML = HandlebarsTemplates['todos/show'](someTodo);
      this.$el.append(todoHTML);
    }, this);

    $('#addTodo').on('submit', function(event) {
      event.preventDefault();

    });
    return this;
  },

  add_todo: function(event) {
    var _this = this;
    event.preventDefault();
    var new_todo = {
      title: $('#todo_title').val(),
      completed: false
    };
    $.ajax({
      method: 'post',
      url   : '/todos.json',
      data  : {todo: new_todo}
    }).done(function(responseData){
      var todoHTML = HandlebarsTemplates['todos/show'](responseData);
      _this.$el.append(todoHTML);
    });
  },
  remove_todo: function(event) {
    var _this = this;
    event.preventDefault();
    var _event = event;
    var id = $(event.target.parentElement).attr('data-id');
    $.ajax({
      method: 'delete',
      url   : '/todos/' + id + '.json'
    }).done(function(data){
      _event.target.parentElement.remove();
    });
  }
});
