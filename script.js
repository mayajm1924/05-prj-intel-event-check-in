// Global Counters
let waterWiseCount = 0;
let netZeroCount = 0;
let renewablesCount = 0;

const checkInForm = document.getElementById('checkInForm');
const nameInput = document.getElementById('attendeeName');
const teamSelect = document.getElementById('teamSelect');
const greeting = document.getElementById('greeting');
const attendeeCountSpan = document.getElementById('attendeeCount');

// Team Count Spans
const waterCountSpan = document.getElementById('waterCount');
const zeroCountSpan = document.getElementById('zeroCount');
const powerCountSpan = document.getElementById('powerCount');

checkInForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Stop page from refreshing

  const name = nameInput.value;
  const team = teamSelect.value;

  // Logic to increment counters based on team selection
  if (team === 'water') {
    waterWiseCount++;
    waterCountSpan.textContent = waterWiseCount;
  } else if (team === 'zero') {
    netZeroCount++;
    zeroCountSpan.textContent = netZeroCount;
  } else if (team === 'power') {
    renewablesCount++;
    powerCountSpan.textContent = renewablesCount;
  }

  // Update total attendance count
  const totalAttendees = waterWiseCount + netZeroCount + renewablesCount;
  attendeeCountSpan.textContent = totalAttendees;

  // Update progress bar
  const progressPercentage = (totalAttendees / 50) * 100;
  const progressBar = document.getElementById('progressBar');
  progressBar.style.width = progressPercentage + '%';

  // Confetti on every check-in
  confetti({
    particleCount: 40,
    spread: 55,
    origin: { y: 0.6 }
  });

  // Celebration when attendance goal is reached
  if (totalAttendees === 50) {
    launchCelebration();
  }

  // Set the welcome message
  const teamNames = {
    'water': 'Team Water Wise',
    'zero': 'Team Net Zero',
    'power': 'Team Renewables'
  };
  greeting.textContent = `Welcome, ${name}! Thanks for checking in with ${teamNames[team]}.`;
  greeting.style.display = 'block';

  // Clear the form
  nameInput.value = '';
  teamSelect.value = '';
});

// Celebration function
function launchCelebration() {
  // Trigger confetti
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });

  // Additional confetti bursts
  setTimeout(function() {
    confetti({
      particleCount: 50,
      spread: 100,
      origin: { y: 0.6 }
    });
  }, 250);

  const teamData = [
    { key: 'water', label: 'Team Water Wise', count: waterWiseCount },
    { key: 'zero', label: 'Team Net Zero', count: netZeroCount },
    { key: 'power', label: 'Team Renewables', count: renewablesCount }
  ];

  const maxCount = Math.max(waterWiseCount, netZeroCount, renewablesCount);
  const winningTeams = teamData.filter(function(team) {
    return team.count === maxCount;
  });

  const winningKeys = winningTeams.map(function(team) {
    return team.key;
  });

  highlightWinningTeams(winningKeys);

  // Show celebration message
  const celebrationMsg = document.getElementById('greeting');
  if (winningTeams.length === 1) {
    celebrationMsg.textContent = `🎉 We've reached 50 attendees! 🎉 ${winningTeams[0].label} leads with great participation!`;
  } else {
    const teamNames = winningTeams.map(function(team) {
      return team.label;
    }).join(' and ');
    celebrationMsg.textContent = `🎉 We've reached 50 attendees! 🎉 It's a tie between ${teamNames}!`;
  }
  celebrationMsg.classList.add('celebration-message');
  celebrationMsg.style.display = 'block';
}

// Function to highlight winning teams by key
function highlightWinningTeams(teamKeys) {
  const teamCards = document.querySelectorAll('.team-card');

  teamCards.forEach(function(card) {
    card.classList.remove('winning-team');
  });

  teamKeys.forEach(function(key) {
    const card = document.querySelector('.team-card.' + key);
    if (card) {
      card.classList.add('winning-team');
    }
  });
}
