const User = require("./User");
const Recipe = require("./Recipe");
const Comment = require("./Comment");

User.hasMany(Recipe, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "comment_id",
  onDelete: "CASCADE",
});

Recipe.belongsTo(User, {
  foreignKey: "user_id",
});

Recipe.hasMany(Comment, {
  foreignKey: "recipe_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Recipe, {
  foreignKey: "recipe_id",
});

module.exports = { User, Recipe, Comment };
