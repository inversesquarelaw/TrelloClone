TrelloClone.Collections.Lists = Backbone.Collection.extend({
  comparator: 'ord',
  model: TrelloClone.Models.List,
  url: 'api/lists',

  initialize: function (models, options) {
    this.board = options.board;
  }
});
