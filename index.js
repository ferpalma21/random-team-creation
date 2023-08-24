const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const captains = [];
const people = [];

function askForCaptainNames() {
  rl.question('Enter the captain\'s name (or type "done" to proceed): ', captainName => {
    if (captainName.toLowerCase() === 'done') {
      askForPersonNames();
    } else {
      captains.push(captainName);
      askForCaptainNames();
    }
  });
}

function askForPersonNames() {
  rl.question('Enter a person\'s name (or type "done" to proceed): ', personName => {
    if (personName.toLowerCase() === 'done') {
      distributePeople();
      rl.close();
    } else {
      people.push(personName);
      askForPersonNames();
    }
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function distributePeople() {
  const teams = {};
  captains.forEach(captain => {
    teams[captain] = [];
  });

  const totalPeople = people.length;
  const averageTeamSize = Math.floor(totalPeople / captains.length);
  const remainder = totalPeople % captains.length;

  shuffleArray(people);

  let currentCaptainIndex = 0;
  while (people.length > 0) {
    const person = people.pop();
    const currentCaptain = captains[currentCaptainIndex];
    teams[currentCaptain].push(person);

    currentCaptainIndex = (currentCaptainIndex + 1) % captains.length;
  }

  console.log('Formed teams:', teams);
}

console.log('Welcome to the Equitable Team Former.');
askForCaptainNames();
