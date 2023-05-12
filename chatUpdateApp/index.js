const bodyParser = require('body-parser'),
    express = require('express'),
    path = require('path');
var app=express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public/index.html')));

app.get('/', (req, res) => {
 
    res.render('', { message: 'Welcome' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));