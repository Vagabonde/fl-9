function victimDataSource(name) {
  const victimsByName = {
    'John': {
      name: 'John',
      surname: 'Doe',
      age: '99',
      jobTitle: 'Victim'
    },
    'Jennifer': {
      name: 'Jennifer',
      surname: 'Nicker',
      age: '21',
      jobTitle: 'Artist'
    }
  };

  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      if (victimsByName.hasOwnProperty(name)) {
        resolve(victimsByName[name]);
      } else {
        reject('unknown victim');
      }
    }, 1000);
  });
}

function crimeDataSource(surname) {
  return new Promise(function(resolve, reject) {
    const crimeBySurname = {
      'Doe': {
        title: 'dank memes',
        place: '9gag'
      },
      'Nicker': {
        title: 'robbery',
        place: 'NYC'
      }
    };

    setTimeout(() => {
      if (crimeBySurname.hasOwnProperty(surname)) {
        resolve(crimeBySurname[surname]);
      } else {
        reject('unknown surname');
      }
    }, 500);
  });
}

function loadVictimData(name) {
  let victimInfo;

  return victimDataSource(name)
  .then(function(victim) {
    victimInfo = victim;

   return crimeDataSource(victim.surname)
  })
  .then((crimeInfo) =>
      `${victimInfo.name} ${victimInfo.surname} suffered from ${crimeInfo.title} in ${crimeInfo.place}`)
  .catch((error) => `Unhandled Promise rejection: ${error}`);
}


/**
 * Output: John Doe(Victim, 99) suffered from dank memes in 9 gag.
 */
loadVictimData('John').then(msg => console.log(msg));
/**
 * Output: Jennifer Nicker(Artist, 21) suffered from robbery in NYC.
 */
loadVictimData('Jennifer').then(msg => console.log(msg));
/**
 * Output: Unhandled Promise rejection: unknown victim
 * or familiar error msg
 */
loadVictimData('Jss').then(msg => console.log(msg));