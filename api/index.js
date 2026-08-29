const expressInstance = require('express');
const expressApp = express();
const hockeyAPI = require('@api/sportradar-hockey');

expressApp.use(expressInstance.static('public'));