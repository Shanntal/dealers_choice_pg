const Sequelize = require('sequelize');

const connection = new Sequelize('postgres://localhost/my_favorites_db');

const data = [
    { item: 'Poems', content: 'Epitaph by Merrit Malloy, The Road Not Taken by Robert Frost, Still I Rise by Maya Angelou'},
    { item: 'Foods', content: 'Lasanga, Coconut shrimp, French fries, Locro de papa, Chicken salad, Steak, Tacos'},
    { item: 'Movies', content: 'The Blind Side, Last Holiday, Coco, Princess and the Frog, La Vita è Bella'}
];

//defining table
const Favorite = connection.define('favorite', {
    item: Sequelize.DataTypes.STRING,
    content: Sequelize.DataTypes.STRING
});

const syncAndSeed = async() => {
    await connection.sync({ force: true });
    await Promise.all(
        data.map(item => Favorite.create(item))
    );
};

module.exports = {
    syncAndSeed,
    models: {
        Favorite
    }
};