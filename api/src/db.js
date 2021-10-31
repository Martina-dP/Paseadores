require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/walker`, {
        logging: false, // set to console.log to see the raw SQL queries
        native: false, // lets Sequelize know we can use pg-native for ~30% more speed
      });
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const {
  Client,
  User,
  Post,
  Complain,
  Preference,
  Image,
  Administrator,
  Orden,
} = sequelize.models;

/*
(async () => {
  
  const jane = await administrator.create({
    name: "grupo",
    surname:"4",
    email:"paseadorescuidadores@gmail.com",
    password: "walker2021"
    
  })
  
})();*/
// Aca vendrian las relaciones

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Complain);
Complain.belongsTo(User);

User.hasMany(Image);
Image.belongsTo(User);
/*
User.hasMany(Client);
Client.belongsTo(User)*/

User.belongsToMany(Client, { through: "user_client" });
Client.belongsToMany(User, { through: "user_client" });

User.hasOne(Preference);
Preference.belongsTo(User);

User.hasMany(Orden);
Orden.belongsTo(User);

Client.hasMany(Orden);
Orden.belongsTo(Client);

Administrator.belongsToMany(User, { through: "admin_user" });
User.belongsToMany(Administrator, { through: "admin_user" });

Administrator.belongsToMany(Client, { through: "admin_client" });
Client.belongsToMany(Administrator, { through: "admin_client" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importar la conexión { conn } = require('./db.js');
};
