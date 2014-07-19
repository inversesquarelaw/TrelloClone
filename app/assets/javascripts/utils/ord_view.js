/*
 * Mixin for Views
 * Using view must define:
 * orderOptions: {
 *   modelElement: 'modelElementSelector',
 *   modelName: 'modelName'
 * }
 */
TrelloClone.Utils.OrdView = {
  saveOrds: function() {
    var itemElements = this.$(this.orderOptions.modelElement),
        idAttribute = this.orderOptions.modelName + '-id',
        collection = this.collection;
    itemElements.each(function(index, element) {
      var $itemElement = $(element),
          itemId = $itemElement.data(idAttribute);
      var item = collection.get(itemId);
      if (item.get('ord') === index) {
        return;
      }
      item.save({ord: index});
    }.bind(this));
  }
};
