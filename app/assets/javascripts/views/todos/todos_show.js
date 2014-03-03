SpaApp.Views.TodosShow = Backbone.View.extend({
  events: {
    'click #removeTodo'    :'remove_todo',
    'click #todo_completed':'check_todo'
  },
  template: HandlebarsTemplates['todos/show'],

  render: function() {
    ($(this.$el).html(this.template(this.model)));
    return this;
  },

  remove_todo: function(event) {
    event.preventDefault();
    var _this = this;
    var id = $(event.target.parentElement).attr('data-id');
    $.ajax({
      method: 'delete',
      url   : '/todos/' + id + '.json'
    }).done(function(data){
      _this.$el.remove();
    });
  },

  check_todo: function(event) {
    var parent = event.target.parentElement.parentElement;
    var id = $(parent).attr('data-id');
    var todo = {
      completed: event.target.checked
    };
    $.ajax({
      method: 'patch',
      url   : '/todos/' + id + '.json',
      data  : {todo: todo}
    }).done(function(data){
      $(parent).toggleClass('done-true');
    });
  }
});