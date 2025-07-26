const bcrypt = require('bcrypt');

const hash = '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';
const plain = 'password';

bcrypt.compare(plain, hash, (err, res) => {
  console.log(res); // true si correspond
});
