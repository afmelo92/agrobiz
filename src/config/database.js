module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'agro',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
