const usersStore = require('./usersStore');

const DEMO_EMAIL = process.env.DEMO_USER_EMAIL || 'demo@adirebloom.com';
const DEMO_PASSWORD = process.env.DEMO_USER_PASSWORD || 'AdireBloom2026!';

async function ensureDemoUser() {
  if (process.env.NODE_ENV === 'production' && process.env.SEED_DEMO_USER !== 'true') return;
  if (process.env.SEED_DEMO_USER === 'false') return;
  if (usersStore.findByEmail(DEMO_EMAIL)) return;

  await usersStore.createUser({
    firstName: 'Demo',
    lastName: 'Client',
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
    agreedToTermsAt: new Date().toISOString(),
  });
  console.log(`Demo account ready: ${DEMO_EMAIL}`);
}

module.exports = { ensureDemoUser, DEMO_EMAIL, DEMO_PASSWORD };
