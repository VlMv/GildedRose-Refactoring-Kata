class CommonProduct {
  constructor() {
    this._dayQualityChange = 1;
    this._maxQuality = 50;
    this._minQuality = 0;
    this._sellInThreshold = 0;
    this._productType = "common product";
  }

  get productType() {
    return this._productType;
  }

  getQuality(quality, sellIn) {
    const dayQualityChange = sellIn < this._sellInThreshold
      ? this._dayQualityChange * 2
      : this._dayQualityChange;
    const productQuality = quality - dayQualityChange;

    return productQuality < this._minQuality
      ? this._minQuality
      : productQuality;
  }
}

class AgedBrie extends CommonProduct {
  constructor() {
    super();
    this._productType = "aged brie";
  }
  getQuality(quality, sellIn) {
    return quality < this._maxQuality
      ? quality + this._dayQualityChange
      : this._maxQuality;
  }
}

class Sulfuras extends CommonProduct {
  constructor() {
    super();
    this._productType = "sulfuras";
  }
  getQuality(quality, sellIn) {
    const sulfurasQuality = 80;

    return quality !== sulfurasQuality
      ? sulfurasQuality
      : quality;
  }
}

class BackstagePases extends CommonProduct {
  constructor() {
    super();
    this._productType = "backstage passes";
  }
  getQuality(quality, sellIn) {
    const tenDayThreshold = 10;
    const fiveDayThreshold = 5;
    let dayQualityChange = this._dayQualityChange;

    if (sellIn > this._sellInThreshold && sellIn < tenDayThreshold) {
      dayQualityChange = sellIn < fiveDayThreshold
        ? dayQualityChange * 3
        : dayQualityChange * 2;
    }
    const backstagePassesQuality = (quality + dayQualityChange) < this._maxQuality
      ? quality + dayQualityChange
      : this._maxQuality;

    return sellIn > this._sellInThreshold
      ? backstagePassesQuality
      : this._minQuality;
  }
}

class Conjured extends CommonProduct {
  constructor() {
    super();
    this._productType = "conjured";
  }
  getQuality(quality, sellIn) {
    const dayQualityChange = sellIn < this._sellInThreshold
      ? this._dayQualityChange * 4
      : this._dayQualityChange * 2;
    const productQuality = quality - dayQualityChange;

    return productQuality < this._minQuality
      ? this._minQuality
      : productQuality;
  }
}

module.exports = { CommonProduct, AgedBrie, BackstagePases, Sulfuras, Conjured };