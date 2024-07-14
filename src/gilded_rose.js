class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}


class AssortmentQuality {
  #dayQualityChange = 1;
  #maxQuality = 50;
  #minQuality = 0;
  #sellInThreshold = 0;
  #assortment = {
    commonProduct: "common product",
    agedBrie: "aged brie",
    sulfuras: "sulfuras",
    backstagePases: "backstage passes",
    conjured: "conjured",
  }

  #getCommonProductQuaity(quality, sellIn) {
    const dayQualityChange = sellIn < this.#sellInThreshold
      ? this.#dayQualityChange * 2
      : this.#dayQualityChange;
    const productQuality = quality - dayQualityChange;

    return productQuality < this.#minQuality
      ? this.#minQuality
      : productQuality;
  }

  #getAgedBrieQuality(quality, sellIn) {
    return quality < this.#maxQuality
      ? quality + this.#dayQualityChange
      : this.#maxQuality;
  }

  #getSulfurasQuality(quality, sellIn) {
    const sulfurasQuality = 80;

    return quality !== sulfurasQuality
      ? sulfurasQuality
      : quality;
  }

  #getBackstagePassesQuality(quality, sellIn) {
    const tenDayThreshold = 10;
    const fiveDayThreshold = 5;
    let dayQualityChange = this.#dayQualityChange;

    if (sellIn > this.#sellInThreshold && sellIn < tenDayThreshold) {
      dayQualityChange = sellIn < fiveDayThreshold
        ? dayQualityChange * 3
        : dayQualityChange * 2;
    }
    const backstagePassesQuality = (quality + dayQualityChange) < this.#maxQuality
      ? quality + dayQualityChange
      : this.#maxQuality;

    return sellIn > this.#sellInThreshold
      ? backstagePassesQuality
      : this.#minQuality;
  }

  #getConjuredQuality(quality, sellIn) {
    const dayQualityChange = sellIn < this.#sellInThreshold
      ? this.#dayQualityChange * 4
      : this.#dayQualityChange * 2;
    const productQuality = quality - dayQualityChange;

    return productQuality < this.#minQuality
      ? this.#minQuality
      : productQuality;
  }

  #assortmentInterface = {
    [this.#assortment.commonProduct]: this.#getCommonProductQuaity.bind(this),
    [this.#assortment.agedBrie]: this.#getAgedBrieQuality.bind(this),
    [this.#assortment.sulfuras]: this.#getSulfurasQuality.bind(this),
    [this.#assortment.backstagePases]: this.#getBackstagePassesQuality.bind(this),
    [this.#assortment.conjured]: this.#getConjuredQuality.bind(this),
  }

  getProductQuality({ name, sellIn, quality }) {
    if (quality < this.#minQuality) return quality;

    for (const [product, getQuality] of Object.entries(this.#assortmentInterface)) {
      if (name.toLowerCase().includes(product)) {
        return getQuality(quality, sellIn);
      }
    }
    return this.#assortmentInterface[this.#assortment.commonProduct](quality, sellIn);
  }
}


class Shop {
  constructor(items = []) {
    this.items = items;
    this.assortmentQuality = new AssortmentQuality();
  }

  updateQuality() {
    this.items.forEach(item => {
      if (!(item instanceof Item)) return;
      const isSulfuras = item.name.toLowerCase().includes('sulfuras');

      item.sellIn = isSulfuras ? item.sellIn : item.sellIn - 1;
      item.quality = this.assortmentQuality.getProductQuality(item);
    })
    return this.items;
  }
}


module.exports = { Item, Shop };