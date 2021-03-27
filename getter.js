async function weapon(selector, page, slot) {
  let weaponData = [];

  try {
    // close modal window if its open
    if (await selector.$('.close')) {
      console.log(`Modal window open, closing.../`);
      await page.click('.close');
    }
    
    const clickElement = await selector.$('.build-select-missing');
    await clickElement.click();
    // await page.screenshot({path: `clicked-${slot}.png`})

    // wait until modal window loaded
    console.log(`Waiting for element to load.../`);
    await page.waitForSelector('.table').then(async () => {
      const spawnedTable = await page.$('.itemselecttable');
      const tableRow = await spawnedTable.$$('tr');

      for (contents of tableRow) {
        const imgObject = await contents.$('img');
        const tdObject = await contents.$('.itemtosearch');

        let rarity = await page.evaluate(e => e.getAttribute('class'), contents);    
        if (rarity == 'rarity-e') {
          rarity = 'Exoctic';
        } else {
          rarity = 'High-End';
        }

        let name = await tdObject.evaluate(e => e.textContent);
        name = name.trim();

        let imgSource = await imgObject.evaluate(e => e.getAttribute('src'), contents);
        imgSource = imgSource.replace('..', 'https://division-builds.com');

        weaponData.push({
          name: name,
          slot: slot,
          rarity: rarity,
          img: imgSource
        })

        console.log(`rarity: ${rarity}, name: ${name}, slot: ${slot}, img: ${imgSource}`)
      }
    })

    return weaponData;

  } catch(err) {
    await page.screenshot({path: `err-${slot}.png`});
    console.log(`<!> Failed to get "${slot}" data.`);
    console.log(err);

    return null;
  }
}

async function gear(selector, page, slot) {
  console.log(`Where: ${await page.url()}`);
  let gearData = [];

  try {
      // close modal window if its open
    if (await selector.$('.close')) {
      console.log(`Modal window open, closing.../`);
      await page.click('.close');
    }
    
    const clickElement = await selector.$('.build-select-missing');
    await clickElement.click();
    // await page.screenshot({path: `clicked-${slot}.png`});

    // wait until modal window loaded
    console.log(`Waiting for element to load.../`);
    await page.waitForSelector('.table').then(async () => {
      const spawnedTable = await page.$('.itemselecttable');
      const tableRow = await spawnedTable.$$('tr');

      for (contents of tableRow) {
        const tdObject = await contents.$('td');
  
        let rarity = await page.evaluate(e => e.getAttribute('class'), contents);    
        // FIXME: switch doesn't work for some reason
        if (rarity == 'rarity-g') {
          rarity = 'Gear-Set';
        } else if (rarity == 'rarity-c') {
          rarity = 'Classified';
        } else if (rarity == 'rarity-e') {
          rarity = 'Exotic';
        } else if (rarity == 'rarity-h') {
          rarity = 'High-End';
        }
  
        //   switch (rarity){
        //   case 'rarity-g':
        //     rarity = 'Gear-Set';
        //   case 'rarity-c':
        //     rarity = 'Classified';
        //   case 'rarity-e':
        //     rarity = 'Exotic';
        //   case 'rarity-h':
        //     rarity = 'High-End';
        // }
  
        let name = await tdObject.evaluate(e => e.textContent);
        name = name.trim();
  
        gearData.push({
          name: name,
          slot: slot,
          rarity: rarity,
        })
  
        console.log(`rarity: ${rarity}, name: ${name}, slot: ${slot}`)
      }    
    });

    return gearData; 

  } catch(err) {
    await page.screenshot({path: `err-${slot}.png`});
    console.log(`<!> Failed to get "${slot}" data.`);
    console.log(err);

    return null;
  }
}

module.exports = {
  weapon,
  gear,
}