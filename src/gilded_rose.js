const { CommonProduct, AgedBrie, BackstagePases, Sulfuras, Conjured } = require("./products_assortment");
const { AssortmentQuality } = require("./assortment_quality");


class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}


class Shop {
  constructor(items = []) {
    this.items = items;
    this.gildedRoseAssortmentQuality = new AssortmentQuality(
      [
        new CommonProduct(),
        new AgedBrie(),
        new Sulfuras(),
        new BackstagePases(),
        new Conjured(),
      ]
    );
  }

  updateQuality() {
    this.items.forEach(item => {
      if (!(item instanceof Item)) return;
      const isSulfuras = item.name.toLowerCase().includes('sulfuras');

      item.sellIn = isSulfuras ? item.sellIn : item.sellIn - 1;
      item.quality = this.gildedRoseAssortmentQuality.getProductQuality(item);
    })
    return this.items;
  }
}


module.exports = { Item, Shop };