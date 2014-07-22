TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/show'],
  
  className: "list-display",
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.cards(), 'add', this.addCard);
    this.listenTo(this.model.cards(), 'add resize', this.setHeight);
  },

  addCard: function (card) {
    var view = new TrelloClone.Views.CardShow({
      model: card
    });
    this.addSubview(".list-cards", view);
  },

  render: function () {
    var content = this.template({
      list: this.model
    });
    this.$el.html(content);
    this.$el.data('list-id', this.model.id);
    
    this.renderCards();
    this.renderFooter();
    setTimeout(this.setHeight.bind(this));
    // this.setHeight();
    return this;
  },

  renderCards: function () {
    this.model.cards().each(this.addCard.bind(this));TrelloClone.Views.BoardsIndex = Backbone.View.extend({
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

  },

  renderFooter: function () {
    var formView = new TrelloClone.Views.CardForm({
      collection: this.model.cards()
    });
    this.addSubview(".list-footer", formView);
  },
  
  setHeight: function() {
    this.$('.list-cards').css('')
    var listsHeight = this.$el.parent().height();
    var listHeight = this.$el.height();
    var headerHeight = this.$('.list-heading').height();
    var footerHeight = this.$('.list-footer').height();
    var cardsHeight = this.$('.list-cards').height();
    
    // debugger
    
    // if (cardsHeight + headerHeight + footerHeight > listHeight) {
    this.$('.list-cards').css('max-height', 
          listsHeight - headerHeight - footerHeight - 11);
    // }
  }
});
