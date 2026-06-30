const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_DIR = process.env.USERS_DATA_DIR || path.join(__dirname, '..', 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, '[]', 'utf8');
}

function readUsers() {
  ensureStore();
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
}

function writeUsers(users) {
  ensureStore();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

function findByEmail(email) {
  return readUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

function findById(id) {
  return readUsers().find((u) => u.id === id);
}

async function createUser({ firstName, lastName, email, password, agreedToTermsAt }) {
  const users = readUsers();
  if (findByEmail(email)) {
    const err = new Error('An account with this email already exists.');
    err.status = 409;
    throw err;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim().toLowerCase(),
    passwordHash,
    agreedToTermsAt,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeUsers(users);
  return user;
}

async function verifyPassword(user, password) {
  return bcrypt.compare(password, user.passwordHash);
}

function publicUser(user) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    createdAt: user.createdAt,
  };
}

module.exports = { findByEmail, findById, createUser, verifyPassword, publicUser };
