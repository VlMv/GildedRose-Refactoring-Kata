const { CommonProduct } = require("./products_assortment");

class AssortmentQuality {
  #commonProduct = new CommonProduct();

  constructor(products = []) {
    this._products = products;
  }

  getProductQuality({ name, sellIn, quality }) {
    if (quality < 0) return quality;

    for (const product of Object.values(this._products)) {
      if (name.toLowerCase().includes(product.productType)) {
        return product.getQuality(quality, sellIn);
      }
    }
    return this.#commonProduct.getQuality(quality, sellIn);
  }
}

module.exports = { AssortmentQuality };