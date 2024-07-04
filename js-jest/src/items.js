class Item {
    static MAX_QUALITY = 50;
    static MIN_QUALITY = 0;
    constructor(name, sellIn, quality){
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality >= 0 ? quality : 0;
    }

    updateQuality() {
        this.sellIn -= 1;
        if (this.quality > Item.MIN_QUALITY) {
            let degradeAmount = this.sellIn < 0 ? 2 : 1;
            this.quality -= degradeAmount;
            if (this.quality < 0) this.quality = Item.MIN_QUALITY;
        }
    }
}

class Sulfuras extends Item {
    constructor(item) {
        super (item.name, item.sellIn, item.quality);
    }

    updateQuality() {}
}


class Brie extends Item{
    constructor(item) {
        super (item.name, item.sellIn, item.quality);
    }

    updateQuality() {
        this.sellIn -= 1;
        if (this.quality < Item.MAX_QUALITY)
            this.quality += 1;
    }
}


class BackstagePass extends Item{
    static DAY_LIMIT_ONE = 11;
    static DAY_LIMIT_TWO = 6;
    constructor(item) {
        super (item.name, item.sellIn, item.quality);
    }

    updateQuality() {
        this.sellIn -= 1;

        let addedQuality = 0;

        if (this.sellIn >= 0){
            addedQuality++;
            if (this.sellIn < BackstagePass.DAY_LIMIT_ONE ) addedQuality++;
            if (this.sellIn < BackstagePass.DAY_LIMIT_TWO) addedQuality ++;

            this.quality += addedQuality;
            if (this.quality > BackstagePass.MAX_QUALITY) this.quality = BackstagePass.MAX_QUALITY;
        } else {
            this.quality = 0;
        }

    }
}

class ConjuredItem extends Item{
    constructor(item) {
        super (item.name, item.sellIn, item.quality);
    }

    updateQuality() {
        this.sellIn -= 1;
        if (this.quality > Item.MIN_QUALITY) {
            let degradeAmount = this.sellIn < 0 ? 4 : 2;
            this.quality -= degradeAmount;
            if (this.quality < 0) this.quality = Item.MIN_QUALITY;
        }
    }
}


module.exports = {
    Item,
    Brie,
    BackstagePass,
    Sulfuras,
    ConjuredItem
}