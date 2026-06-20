const express = require('express');
const { signToken, authRequired } = require('../middleware/auth');
const usersStore = require('../lib/usersStore');

const router = express.Router();

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, agreedToTerms } = req.body;

    if (!firstName?.trim() || !lastName?.trim()) {
      return res.status(400).json({ message: 'First and last name are required.' });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'A valid email address is required.' });
    }
    if (!password || password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters.' });
    }
    if (!agreedToTerms) {
      return res.status(400).json({
        message: 'You must agree to the Terms & Conditions, Refund Policy, and Privacy Policy.',
      });
    }

    const user = await usersStore.createUser({
      firstName,
      lastName,
      email,
      password,
      agreedToTermsAt: new Date().toISOString(),
    });

    const token = signToken(user);
    return res.status(201).json({
      token,
      user: usersStore.publicUser(user),
    });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || 'Registration failed.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validateEmail(email) || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = usersStore.findByEmail(email);
    if (!user || !(await usersStore.verifyPassword(user, password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = signToken(user);
    return res.json({ token, user: usersStore.publicUser(user) });
  } catch {
    return res.status(500).json({ message: 'Login failed.' });
  }
});

router.get('/me', authRequired, (req, res) => {
  const user = usersStore.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found.' });
  return res.json({ user: usersStore.publicUser(user) });
});

module.exports = router;
