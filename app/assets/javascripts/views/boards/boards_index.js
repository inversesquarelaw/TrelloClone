TrelloClone.Views.BoardsIndex = Backbone.View.extend({
  template: JST['boards/index'],

  className: 'boards-index',

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
    $('body').css('background-color', 'rgb(255, 255, 255)')
  },

  render: function () {
    var content = this.template({
      boards: this.collection
    });

    this.$el.html(content);
    return this;
  }
});
