const express = require('express');
//const { noExtendLeft } = require('sequelize/types/lib/operators');
const app = express(); 
const { syncAndSeed, models: { Favorite } } = require('./db');

app.get('/', (req, res) => res.redirect('/favorites'));

app.get('/favorites', async(req, res, next) => {
    try {
        const favorites = await Favorite.findAll();
        //console.log(favorites);
        //console.log(Object.entries(favorites));
        res.send(`
        <html>
          <head>
            <title>Shanntal's Favorites</title>
          </head>
          <nav>
            <a href='/'>Home</a>
          </nav>
          <body>
            <h1>Shanntal's Favorites</h1>
            <ul>
                ${
                    Object.entries(favorites).map(entry => {
                        const key = entry[1].id;
                        const itemTitle = entry[1].item;
                        //console.log('this is entry: ' + entry);
                        return `
                            <li>
                                <a href='/favorites/${key}'>${itemTitle}</a>
                            </li>
                        `
                    }).join('')
                }
            </ul>
          </body>
        </html>
        
        `);
        
    }
    catch (err) {
        next(err);
    }
});

app.get('/favorites/:id', async(req, res, next) => {
    const favorites = await Favorite.findByPk(req.params.id * 1);
    const favorite = favorites.dataValues;
    
    //console.log(favorite.content);

    res.send(/*do html favorite.content*/`
        <html>
            <nav>
                <a href='/'>Home</a>
             </nav>
             <head>${favorite.item}</head>
             <body>
                <p>${favorite.content}</p>
             </body>

        </html>
    `);
});



const init = async() => {
    try {
        await syncAndSeed();
        console.log('successfully synced & seeded');
        const PORT = 3000;
        app.listen(PORT, function() {
            console.log(`Listening on port ${PORT}`);
        });
    }
    catch (err) {
        console.log(err);
    }
};

init();

