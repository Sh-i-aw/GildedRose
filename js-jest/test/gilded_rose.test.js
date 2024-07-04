const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it ("Quality is never negative", function () {
    const gildedRose = new Shop(
        [ new Item("foo", 0, 1) ]
    );
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeGreaterThan(-1);
  });

  it ("Quality is never more than 50 ", function () {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 2, 49) ]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeLessThan(51);
  });

  it("Aged Brie Quality increases as it ages (expire or not)", function() {
    let initialQuality = 20;
    const gildedRose = new Shop(
        [ new Item("Aged Brie", 10, initialQuality),
                new Item("Aged Brie", 0, initialQuality) ],
    );
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(initialQuality + 1);
    expect(items[1].quality).toBe(initialQuality + 1);
  });

  it("Sulfuras Quality or SellIn does not decrease", function() {
    let initialQuality = 20;
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 10, initialQuality) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(10);
    expect(items[0].quality).toBe(initialQuality);
  });

  it("Backstage pass Quality increase by 1 when SellIn > 10 ", function() {
    let initialQuality = 20;
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 15, initialQuality) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(14)
    expect(items[0].quality).toBe(initialQuality + 1)
  });

  it("Backstage pass Quality increase by 2 when SellIn <= 10 ", function() {
    let initialQuality = 20;
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 11, initialQuality) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(10)
    expect(items[0].quality).toBe(initialQuality + 2)
  });

  it("Backstage pass Quality increase by 3 when SellIn <= 5 ", function() {
    let initialQuality = 20;
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 6, initialQuality) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(5)
    expect(items[0].quality).toBe(initialQuality + 3)
  });

  it("Backstage pass Quality is 0 when concert occurs", function() {
    let initialQuality = 20;
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 0, initialQuality)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(-1)
    expect(items[0].quality).toBe(0)
  });

  it("Conjured items degrade in Quality twice as fast", function () {
    let initialQuality = 20;
    const gildedRose = new Shop(
        [ new Item("Conjured Croissant", 2, initialQuality),
                new Item("Conjured Cronut", 0, initialQuality)
        ]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(1)
    expect(items[0].quality).toBe(initialQuality - 2);
    expect(items[1].sellIn).toBe(-1)
    expect(items[1].quality).toBe(initialQuality - 4);
  })

  it("Normal item before or on sell date, quality decrease by 1", function (){
    let initialQuality = 20;
    const gildedRose = new Shop(
        [ new Item("foo", 10, initialQuality),
                new Item("foo", 1, initialQuality)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(initialQuality - 1);
    expect(items[1].sellIn).toBe(0);
    expect(items[1].quality).toBe(initialQuality - 1);
  });


  it("Normal item after sell date, quality decrease by 2", function (){
    let initialQuality = 20;
    const gildedRose = new Shop([ new Item("foo", 0, initialQuality)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(18);
  });
});
