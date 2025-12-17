import { DataTypes, Model } from "sequelize";
import sequelize from "../db/db";
import Product from "./product";

class Category extends Model {
  public id!: string;
  public watch_type!: string;
}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    watch_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "categories",
    timestamps: true,
    underscored: true,
  },
);

Category.hasMany(Product, {
  foreignKey: "category_id",
  as: "products",
});

Product.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

export default Category;
