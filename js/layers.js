addLayer("g", {
    name: "Generic Reset", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "GR", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),

    }},
    color: "#00FFFF",
    
    requires: new decimal(5),
 // Can be a function that takes requirement increases into account
    resource: "Generic Points", // Name of prestige currency
    baseResource: "money", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.6, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('r', 12)) mult = mult.times(2)	
        if (hasUpgrade('r', 13)) mult = mult.times(2)
        if (hasUpgrade('g', 23)) mult = mult.times(1.5)	
        if (hasUpgrade('g', 24)) mult = mult.times(2)	
        if (hasUpgrade('a', 11)) mult = mult.times(3)
        if (hasUpgrade('r', 32)) mult = mult.times(upgradeEffect('r', 32))
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
            title: "Another Upgrade",
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
            cost: new Decimal(1000),
            effect() {
                return player[this.layer].points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        22: {
            title: "Tenfold!",
            description: "Decuples your cash gain!",
            cost: new Decimal(7000),
        },
        23: {
            title: "More GP?",
            description: "Multiplies your GP gain by 1.5.",
            cost: new Decimal(65000),
        },
        24: {
            title: "Give and Take",
            description: "Divides your money by 2, but multiplies your GP by 2.",
            cost: new Decimal(300000),
        },
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
        if (hasUpgrade('a', 13)) mult = mult.times(1.5)
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
        12: {
            title: "Multiplying prestige layers?",
            description: "What is this sorcery? Doubles your GP gain.",
            cost: new Decimal(4),
        },
        13: {
            title: "Another GP Upgrade",
            description: "Doubles GP gain again.",
            cost: new Decimal(12),
        }, 
        21: {
            title: "Overpowered?",
            description: "Gives rebirth an effect toward money!",
            cost: new Decimal(50),
            effect() {
                return player[this.layer].points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        22: {
            title: "One Rebirth",
            description: "Increases the base of money by 1.",
            cost: new Decimal(135),
        },     
        23: {
            title: "Double Rebirth",
            description: "Increases the base of money by 4.",
            cost: new Decimal(200),
        },  
        31: {
            title: "The Tree's Beginning",
            description: "Multiplies GP gain by the log10 of RP.",
            cost: new Decimal(500),
            effect() {
                return player[this.layer].points.log(10).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect

        },     
        32: {
            title: "The True Beginning...",
            description: "Multiplies Advancements by 1.5.",
            cost: new Decimal(1250),
        },      
    },

    layerShown(){return true}
})

addLayer("a", {
    name: "Advanced Reset", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AR", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),

    }},
    color: "#0088ff",
    requires: new Decimal(100000), // Can be a function that takes requirement increases into account
    resource: "Advancements", // Name of prestige currency
    baseResource: "money", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Perform an advanced reset.", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "Advanced Multiplying",
            description: "Multiplies your GP by quite a bit.",
            cost: new Decimal(5),
        },
        12: {
            title: "Cash Advance",
            description: "Multiplies your money by quite a bit.",
            cost: new Decimal(12),
        }, 
        13: {
            title: "Advanced Rebirth",
            description: "Multiplies your RP gain by 1.5.",
            cost: new Decimal(25),
        },     
    },

    layerShown(){return true}
})

