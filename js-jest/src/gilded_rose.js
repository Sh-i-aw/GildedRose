const {  Item, Brie, BackstagePass, Sulfuras, ConjuredItem} = require ("./items");

class Shop {
  static BRIE = "Aged Brie";
  static BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert";
  static SULFURAS = "Sulfuras, Hand of Ragnaros";

  items = [];

  constructor(items=[]){
    items.forEach((currentItem, i) => {
      let newItem;

      if (Shop.isConjured(currentItem)){
        newItem = new ConjuredItem(currentItem);
      } else {
        switch(currentItem.name){
          case Shop.BRIE:
            newItem = new Brie(currentItem);
            break;
          case Shop.BACKSTAGE_PASS:
            newItem = new BackstagePass(currentItem);
            break;
          case Shop.SULFURAS:
            newItem = new Sulfuras(currentItem);
            break;
          default:
            newItem = new Item(currentItem.name, currentItem.sellIn, currentItem.quality);
            break;
        }
      }

      this.items.push(newItem);
    })

  }
  updateQuality() {
    this.items.forEach((currentItem)=>{currentItem.updateQuality()});

    return this.items;
  }

  static isConjured(currentItem) {
    let pattern = /conjured/i;
    let result = currentItem.name.match(pattern);

    return result.length > 0;
  }
}


module.exports = {
  Item,
  Shop
}
