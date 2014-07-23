TrelloClone.Views.CardShow = Backbone.View.extend({
  template: JST['cards/show'],

  className: 'card well well-sm card-display',

  attributes: function() {
    return {
      'data-card-id': this.model.id
    };
  },

  render: function () {
    var content = this.template({
      card: this.model
    });
    this.$el.html(content);
    return this;
  }
});
