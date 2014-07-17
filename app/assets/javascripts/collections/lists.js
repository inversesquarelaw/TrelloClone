TrelloClone.Collections.Lists = Backbone.Collection.extend({
  comparator: 'ord',
  model: TrelloClone.Models.List,
  url: 'api/lists',

  initialize: function (models, options) {
    this.board = options.board;
  },

  updateListOrd: function (listId, ord) {
    var list = this.get(listId);
    if (list.get('ord') === ord) {
      return;
    }
    list.save({ord: ord});
  }
});
