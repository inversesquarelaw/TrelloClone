TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  className: 'clearfix',
  
  events: {
    'sortstop': 'saveListsOrder'
  },

  template: JST['boards/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.lists(), 'add', this.addList);
    $('body').css('background-color', 'rgb(35, 113, 159)')
  },

  addList: function (list) {
    var view = new TrelloClone.Views.ListShow({
      model: list
    });
    this.addSubview("#lists", view);
  },

  render: function () {
    var content = this.template({
      board: this.model
    });
    this.$el.html(content);
    this.renderLists();
    this.renderListForm();
    return this;
  },

  renderLists: function () {
    this.model.lists().each(this.addList.bind(this));
    this.$('#lists').sortable();
  },

  renderListForm: function () {
    var view = new TrelloClone.Views.ListForm({
      collection: this.model.lists()
    });
    this.addSubview("#list-form", view);
  },

  saveListsOrder: function(event) {
    var $listDisplays = this.$('.list-display');
    $listDisplays.each(function(index, element) {
      var $listDisplay = $(element),
          listId = $listDisplay.data('list-id');
      this.model.lists().updateListOrd(listId, index);
    }.bind(this));
  }
});
