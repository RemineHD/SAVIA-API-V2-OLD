// Import Core APP
import app from './core/app';

// Import database
import './core/database';

//import token download
import { downloadTokens } from './controllers/token.controller';
downloadTokens();

app.listen(3000);
console.log('Server listening on port', 3000);