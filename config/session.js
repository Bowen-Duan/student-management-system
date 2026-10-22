module.exports = {
  // Set SESSION_SECRET in your .env file; the fallback is for local dev only.
  secret: process.env.SESSION_SECRET || 'dev-only-secret-change-me',
  resave: false,
  saveUninitialized: false
};
