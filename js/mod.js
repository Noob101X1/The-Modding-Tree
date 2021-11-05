let modInfo = {
	name: "Tree of Many Layers",
	id: "QualityofLife",
	author: "Noob101X1",
	pointsName: "money",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.1",
	name: "Another layer?",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1.2</h3><br>
		- Added advancements.<br>
		- Added more upgrades.`

let winText = `So ... You were dedicated enough to do all the grinding? Well, let's just say ... GG.`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade('g', 11)) gain = gain.times(2)	
	if (hasUpgrade('g', 12)) gain = gain.times(2)
	if (hasUpgrade('g', 13)) gain = gain.times(3)
	if (hasUpgrade('g', 14)) gain = gain.times(4)
	if (hasUpgrade('g', 24)) gain = gain.times(0.5)
	if (hasUpgrade('g', 22)) gain = gain.times(10)
	if (hasUpgrade('g', 21)) gain = gain.times(upgradeEffect('g', 21))
	if (hasUpgrade('r', 11)) gain = gain.times(5)
	if (hasUpgrade('r', 21)) gain = gain.times(upgradeEffect('r', 21))
	if (hasUpgrade('a', 12)) gain = gain.times(8)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e999999999"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(1) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}