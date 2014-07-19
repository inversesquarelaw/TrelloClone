TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  orderOptions: {
    modelElement: '.card-display',
    modelName: 'card',
  },
  events: {
    'sortreceive': 'receiveCard',
    'sortremove': 'removeCard',
    'sortstop': 'saveCards'
  },
  template: JST['lists/show'],
  className: "col-md-3",

  initialize: function () {
    this.collection = this.model.cards();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addCard);
  },

  addCard: function (card) {
    var view = new TrelloClone.Views.CardShow({
      model: card
    });
    this.addSubview(".cards", view);
  },

  receiveCard: function(event, ui) {
    var $cardDisplay = ui.item,
        cardId = $cardDisplay.data('card-id'),
        newOrd = $cardDisplay.index();
    var cardClone = new TrelloClone.Models.Card({
      id: cardId,
      list_id: this.model.id,
      ord: newOrd
    });
    cardClone.save();
    this.collection.add(cardClone, {silent: true});
    this.saveCards(event);
  },

  removeCard: function(event, ui) {
    var $cardDisplay = ui.item,
        cardId = $cardDisplay.data('card-id'),
        cards = this.model.cards(),
        cardToRemove = cards.get(cardId),
        cardSubviews = this.subviews('.cards');
    cards.remove(cardToRemove);
    // TODO: Figure out how to safely remove subview.
    //var subviewToRemove = _.findWhere(cardSubviews, {model: cardToRemove});
    //subviewToRemove && this.removeSubview('.cards', subviewToRemove);
  },

  render: function () {
    var content = this.template({
      list: this.model
    });
    this.$el.html(content);

    this.renderCards();
    this.renderFooter();
    return this;
  },

  renderCards: function () {
    this.model.cards().each(this.addCard.bind(this));
    this.$('.cards').sortable({connectWith: '.cards'});
  },

  renderFooter: function () {
    var formView = new TrelloClone.Views.CardForm({
      collection: this.model.cards()
    });
    this.addSubview(".panel-footer", formView);
  },

  saveCards: function(event) {
    event.stopPropagation(); // Prevent list sorting listener from firing.
    this.saveOrds();
  }
});

_.extend(TrelloClone.Views.ListShow.prototype, TrelloClone.Utils.OrdView);
