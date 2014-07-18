TrelloClone.Views.DropDownView = Backbone.View.extend({
  attributes: {
    role: 'menu',
    class: 'dropdown-menu add-menu'
  },
  
  createBoard: function(event) {
    var $form = $(event.target);
    var boardTitle = $form.find('input').val() || 
          'Untitled Board';
    TrelloClone.Collections.boards.create({ title: boardTitle }, {
      success: function(board) {
        var id = board.id;
        Backbone.history.navigate('/boards/' + id, { trigger: true })
      }
    });
  },
  
  events: {
    'click .new-board': 'showForm',
    'click .cancel': 'hideForm',
    'submit form': 'createBoard'
  },
  
  formTemplate: JST['layout/_form'],
  
  hideForm: function(event) {
    this.$el.html(this.template());
    return false;
  },
  
  render: function() {
    var renderedContent = this.template()
    this.$el.html(renderedContent)
    return this;
  },
  
  tagName: 'ul',
  
  template: JST['layout/dropdown'],
  
  showForm: function(event) {
    this.$el.html(this.formTemplate())
    return false;
  }

})