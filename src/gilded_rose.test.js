const { Item, Shop } = require("./gilded_rose");

describe("Gilded Rose test", () => {
  let daysCount;
  let initialItems;
  let gildedRose;
  let fiveDaysItems;
  let tenDaysItems;
  let fifteenDaysItems;

  beforeAll(() => {
    daysCount = 15;
    initialItems = [
      new Item("The broken staff", 5, -5),
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Elixir of the Mongoose", 7, 5),
      new Item("Aged Brie", 10, 40),
      new Item("Blue Aged Brie", 5, 0),
      new Item("Neck of Thor, Sulfuras", -1, 80),
      new Item("SUM 41 concert Backstage passes", 16, 25),
      new Item("Backstage passes to Blink-182 concert", 12, 10),
      new Item("Conjured Health Potion", 10, 40),
    ];
    fiveDaysItems = [
      { name: "The broken staff", sellIn: 0, quality: -5 },
      { name: "+5 Dexterity Vest", sellIn: 5, quality: 15 },
      { name: "Elixir of the Mongoose", sellIn: 2, quality: 0 },
      { name: "Aged Brie", sellIn: 5, quality: 45 },
      { name: "Blue Aged Brie", sellIn: 0, quality: 5 },
      { name: "Neck of Thor, Sulfuras", sellIn: -1, quality: 80 },
      { name: "SUM 41 concert Backstage passes", sellIn: 11, quality: 30 },
      { name: "Backstage passes to Blink-182 concert", sellIn: 7, quality: 18 },
      { name: "Conjured Health Potion", sellIn: 5, quality: 30 },
    ];
    tenDaysItems = [
      { name: "The broken staff", sellIn: -5, quality: -5 },
      { name: "+5 Dexterity Vest", sellIn: 0, quality: 10 },
      { name: "Elixir of the Mongoose", sellIn: -3, quality: 0 },
      { name: "Aged Brie", sellIn: 0, quality: 50 },
      { name: "Blue Aged Brie", sellIn: -5, quality: 10 },
      { name: "Neck of Thor, Sulfuras", sellIn: - 1, quality: 80 },
      { name: "SUM 41 concert Backstage passes", sellIn: 6, quality: 39 },
      { name: "Backstage passes to Blink-182 concert", sellIn: 2, quality: 31 },
      { name: "Conjured Health Potion", sellIn: 0, quality: 20 },
    ];
    fifteenDaysItems = [
      { name: "The broken staff", sellIn: -10, quality: -5 },
      { name: "+5 Dexterity Vest", sellIn: -5, quality: 0 },
      { name: "Elixir of the Mongoose", sellIn: -8, quality: 0 },
      { name: "Aged Brie", sellIn: -5, quality: 50 },
      { name: "Blue Aged Brie", sellIn: -10, quality: 15 },
      { name: "Neck of Thor, Sulfuras", sellIn: - 1, quality: 80 },
      { name: "SUM 41 concert Backstage passes", sellIn: 1, quality: 50 },
      { name: "Backstage passes to Blink-182 concert", sellIn: -3, quality: 0 },
      { name: "Conjured Health Potion", sellIn: -5, quality: 0 },
    ];
    gildedRose = new Shop(initialItems);
  });


  test("Изменение качества товаров", () => {
    for (let day = 1; day <= daysCount; day++) {
      let updatedItems = gildedRose.updateQuality();
      if (day === 5) expect(updatedItems).toEqual(fiveDaysItems);
      if (day === 10) expect(updatedItems).toEqual(tenDaysItems);
      if (day === 15) expect(updatedItems).toEqual(fifteenDaysItems);
    }
  });
});
