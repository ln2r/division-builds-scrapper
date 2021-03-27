const puppeteer = require('puppeteer');
const get = require('./getter');
const config = require('./config.json');
const fs = require('fs');

async function controller(email, password) {
  // emulate user login
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

  await page.goto('https://division-builds.com/login', { waitUntil: 'domcontentloaded'});
  console.log(`Where: ${page.url()}`);
  console.log(`Logging in.../`);

  // await page.screenshot({path: 'login.png'});
  await page.type('[name=email]', email);
  await page.type('[name=password]', password);  
  await page.keyboard.press('Enter');
  console.log(`Logged in with: ${email}`);

  console.log(`Moving to create build page.../`);
  await page.waitForNavigation({
    waitUntil: 'networkidle0',
  });

  await page.goto(`https://division-builds.com/create-build`, { waitUntil: 'domcontentloaded'});
  console.log(`Where: ${page.url()}`);
  // await page.screenshot({path: 'moved.png'});

  // begin data scrapping
  // gear data
  console.log('Getting gear data info.../');
  console.log(`\nGetting chest data.../`);  
  const containerChest = await page.$('#chest-col');
  const chestData = await get.gear(containerChest, page, 'chest');
  console.log(chestData);
  console.log(`Chest data get! length: ${chestData.length}`);

  console.log(`\nGetting backpack data.../`);  
  const containerBackpack = await page.$('#backpack-col');
  const backpackData = await get.gear(containerBackpack, page, 'backpack');
  console.log(backpackData);
  console.log(`Backpack data get! length: ${backpackData.length}`);

  console.log(`\nGetting mask data.../`);  
  const containerMask = await page.$('#mask-col');
  const maskData = await get.gear(containerMask, page, 'mask');
  console.log(`Mask data get! length: ${maskData.length}`);

  console.log(`\nGetting gloves data.../`);  
  const containerGloves = await page.$('#gloves-col');
  const glovesData = await get.gear(containerGloves, page, 'gloves');
  console.log(`Gloves data get! length: ${glovesData.length}`);

  console.log(`\nGetting kneepads data.../`);  
  const containerKneepads = await page.$('#kneepads-col');
  const kneepadsData = await get.gear(containerKneepads, page, 'kneepads');
  console.log(`Kneepads data get! length: ${kneepadsData.length}`);

  console.log(`\nGetting holster data.../`);  
  const containerHolster = await page.$('#holster-col');
  const holsterData = await get.gear(containerHolster, page, 'holster');
  console.log(`Holster data get! length: ${holsterData.length}`);

  // combining data
  const gearData = chestData.concat(backpackData, maskData, glovesData, kneepadsData, holsterData);
  console.log(`\nGear data combined! length: ${gearData.length}`);

  // weapon data
  // TODO: try to get the suitable talents, attachments
  console.log(`\nGetting main weapon data.../`);  
  const containerMain = await page.$('#primaryweapon-row');
  const mainWeaponData = await get.weapon(containerMain, page, 'main');
  console.log(`Weapon data get! length: ${mainWeaponData.length}`);

  console.log(`\nGetting sidearm weapon data.../`);  
  const containerSidearm = await page.$('#sidearm-row');
  const sidearmData = await get.weapon(containerSidearm, page, 'sidearm')
  console.log(`Sidearm data get! length: ${sidearmData.length}`);

  const weaponData = mainWeaponData.concat(sidearmData);
  console.log(`\nWeapon data combined! length: ${weaponData.length}`);

  // // closing the pages
  // console.log('\nScrapping ended. Closing browser instance.')
  // await browser.close();

  // writing data
  fs.writeFile(`${config.output}/gears.json`, JSON.stringify(gearData, null, 2), (err) => {
    if (err){
      console.log('<!> Failed to write gears data.');
      console.log(err)
    }
  });
  fs.writeFile(`${config.output}/weapons.json`, JSON.stringify(weaponData, null, 2), (err) => {
    if (err){
      console.log('<!> Failed to write weapon data.');
      console.log(err)
    }
  });  
}

module.exports = {
  controller
}