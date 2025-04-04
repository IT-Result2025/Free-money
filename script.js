// Sign Up Logic
function signupUser() {
  const name = document.getElementById('signupName').value;
  const mobile = document.getElementById('signupMobile').value;
  const password = document.getElementById('signupPassword').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];

  if (users.some(user => user.mobile === mobile)) {
    alert("Mobile already registered!");
    return;
  }

  users.push({ name, mobile, password, coins: 0, youtubeClaimed: false });
  localStorage.setItem('users', JSON.stringify(users));
  alert("Signup successful! Please login.");
  window.location.href = "index.html";
}

// Login Logic
function loginUser() {
  const mobile = document.getElementById('loginMobile').value;
  const password = document.getElementById('loginPassword').value;
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(u => u.mobile === mobile && u.password === password);

  if (!user) {
    alert("Invalid credentials");
    return;
  }

  localStorage.setItem('loggedInUser', JSON.stringify(user));
  showDashboard();
}

// Show Dashboard and Profile
function showDashboard() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!user) return;

  document.getElementById('loginBox')?.classList.add('hidden');
  const dash = document.getElementById('dashboard');
  if (dash) {
    dash.classList.remove('hidden');
    document.getElementById('username').textContent = user.name;
    document.getElementById('coinCount').textContent = user.coins;

    // Profile data
    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileMobile').textContent = user.mobile;
    document.getElementById('profileCoins').textContent = user.coins;
  }
}

// Complete YouTube Task
function claimYouTubeReward() {
  let users = JSON.parse(localStorage.getItem('users'));
  let user = JSON.parse(localStorage.getItem('loggedInUser'));

  if (user.youtubeClaimed) {
    alert("You've already claimed this reward.");
    return;
  }

  user.coins += 100;
  user.youtubeClaimed = true;

  users = users.map(u => u.mobile === user.mobile ? user : u);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('loggedInUser', JSON.stringify(user));
  alert("✅ +100 Coins added for YouTube task!");

  updateUI(user);
}

// Withdraw Logic
function withdraw() {
  let users = JSON.parse(localStorage.getItem('users'));
  let user = JSON.parse(localStorage.getItem('loggedInUser'));

  if (user.coins < 5000) {
    alert("❌ You need at least 5000 coins to withdraw.");
    return;
  }

  user.coins -= 5000;
  alert("✅ ₹2800 will be sent within 2 hours.");

  users = users.map(u => u.mobile === user.mobile ? user : u);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('loggedInUser', JSON.stringify(user));

  updateUI(user);
}

// Logout
function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = "index.html";
}

// Update UI after tasks
function updateUI(user) {
  document.getElementById('coinCount').textContent = user.coins;
  document.getElementById('profileCoins').textContent = user.coins;
}

// Auto-load dashboard if logged in
window.onload = function () {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (user && window.location.pathname.includes('index')) {
    showDashboard();
  }
};
