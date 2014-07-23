TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  className: 'clearfix',

  events: {
    'sortstop': 'saveOrds'
  },

  orderOptions: {
    modelElement: '.list-display',
    modelName: 'list',
  },

  template: JST['boards/show'],

  initialize: function () {
    $('body').css('background-color', 'rgb(35, 113, 159)')
    this.collection = this.model.lists();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addList);
  },

  addList: function (list) {
    var view = new TrelloClone.Views.ListShow({
      model: list
    });
    this.addSubview('#lists', view);
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
      collection: this.collection
    });
    this.addSubview('#list-form', view);
  }
});

_.extend(TrelloClone.Views.BoardShow.prototype, TrelloClone.Utils.OrdView);
