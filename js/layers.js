addLayer("g", {
    name: "Generic Reset", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "GR", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#00FFFF",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "Generic Points", // Name of prestige currency
    baseResource: "money", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.6, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "G: Convert cash to Generic Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "The beginning...",
            description: "Doubles your money gain.",
            cost: new Decimal(10),
        },
        12: {
            title: "Another Ugrade",
            description: "Doubles your money gain again.",
            cost: new Decimal(15),
        },
        13: {
            title: "Triplicator",
            description: "Triples your money gain.",
            cost: new Decimal(27),
        },
        14: {
            title: "Extra Multiplication",
            description: "Further multiplies money gain.",
            cost: new Decimal(50),
        },
        21: {
            title: "Inception",
            description: "Multiplies money by GP!",
            cost: new Decimal(10000),
            effect() {
                return player[this.layer].points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }
    },
    layerShown(){return true}
})

addLayer("r", {
    name: "Rebirth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#0088ff",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "Rebirth Points", // Name of prestige currency
    baseResource: "money", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Rebirth for some Rebirth Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "Money: Reborn",
            description: "Multiplies your cash a little more.",
            cost: new Decimal(1),
        },

    },

    layerShown(){return true}
})
