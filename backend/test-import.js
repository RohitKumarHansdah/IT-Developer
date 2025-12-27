console.log('Testing imports...');

try {
  const User = require('./models/User');
  console.log('✅ User model imported successfully');
} catch (error) {
  console.log('❌ User model import failed:', error.message);
}

try {
  const { auth } = require('./middleware/auth');
  console.log('✅ Auth middleware imported successfully');
} catch (error) {
  console.log('❌ Auth middleware import failed:', error.message);
}

try {
  const authRoutes = require('./routes/auth');
  console.log('✅ Auth routes imported successfully');
} catch (error) {
  console.log('❌ Auth routes import failed:', error.message);
}
