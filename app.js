

// const bigShroom = {
//   image: "assets/shroom.png"
// };

const inventory = {
  mushrooms: 0,
  clicks: 0,
  multipliers: 0,
  autoForagers: 0
};

const upgrades = [
  {
    name: 'shovel',
    type: 'multiplier',
    price: 10,
    quantity: 0,
    multiplier: 4,
    isPurchased: false
  },
  {
    name: 'axe',
    type: 'multiplier',
    price: 80,
    quantity: 0,
    multiplier: 14,
    isPurchased: false
  },
  {
    name: 'robot',
    type: 'autoForager',
    price: 50,
    quantity: 0,
    multiplier: 10
  },
  {
    name: 'tractor',
    type: 'autoForager',
    price: 120,
    quantity: 0,
    multiplier: 50,
    isPurchased: false
  }
];

// Draw inventory goes here


function drawMushrooms() {
  let mushroomsTemplate = '';
  mushroomsTemplate += `
    <div class="row">
      <h1><span id="mushrooms">${inventory.mushrooms}</span></h1>
    </div>
  `;
  // @ts-ignore
  document.getElementById('mushrooms').innerHTML = mushroomsTemplate;
  console.log('foraging' , inventory.mushrooms);

}

function drawClicks() {
  let clicksTemplate = ''
  clicksTemplate += `
    <div class="row">
      <h1><span id="clicks">${inventory.clicks}</span></h1>
    </div>
  `
  // @ts-ignore
  document.getElementById('clicks').innerHTML = clicksTemplate
}

function forageShrooms() {
  inventory.clicks++;
  inventory.mushrooms++;
  let mushroomsMultiplier = 0;
  if (upgrades[0].isPurchased) {
    mushroomsMultiplier += upgrades[0].multiplier;
  }
  if (upgrades[1].isPurchased) {
    mushroomsMultiplier += upgrades[1].multiplier;
  }
  mushroomsMultiplier += inventory.multipliers;
  inventory.mushrooms += mushroomsMultiplier;
  drawMushrooms();
  drawClicks();
}



function buyUpgrades(upgradeName) {
  const upgrade = upgrades.find(upgrade => upgrade.name == upgradeName);
  // @ts-ignore
  if (upgrade.price <= inventory.mushrooms) {
    // @ts-ignore
    inventory.mushrooms -= upgrade.price;
    // @ts-ignore
    if (upgrade.type == 'multiplier') {
      // @ts-ignore
      inventory.multipliers += upgrade.multiplier;
    // @ts-ignore
    } else if (upgrade.type == 'autoForager') {
      // @ts-ignore
      inventory.autoForagers += upgrade.multiplier;
      // @ts-ignore
      if (upgrade.isPurchased) {
        // @ts-ignore
        upgrade.multiplier *= 2;
      }
      // @ts-ignore
      if (upgrade.name == 'robot') {
        // @ts-ignore
        upgrade.isPurchased = true;
        robotInterval();
      // @ts-ignore
      } else if (upgrade.name == 'tractor') {
        // @ts-ignore
        upgrade.isPurchased = true;
        tractorInterval();
      }
    }
    // @ts-ignore
    upgrade.price *= 2;
    drawMushrooms();
  } else {
    alert("Not enough shrooms");
  }
}

// Auto Foragers
function robotInterval() {
  const robotUpgrade = upgrades.find(upgrades => upgrades.name == 'robot');
  if (robotUpgrade && robotUpgrade.isPurchased) {
    setInterval(() => {
      inventory.mushrooms += 10;
      drawMushrooms();
    }, 3000);
  }
}

function tractorInterval() {
  const tractorUpgrade = upgrades.find(upgrades => upgrades.name == 'tractor');
  if (tractorUpgrade && tractorUpgrade.isPurchased) {
    setInterval(() => {
      inventory.mushrooms += 25;
      drawMushrooms();
    }, 5000);
  }
}


drawMushrooms()
drawClicks()

