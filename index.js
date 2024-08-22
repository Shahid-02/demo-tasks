const app = require('./app.js');
const dotenv =  require('dotenv').config()



const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
    
})