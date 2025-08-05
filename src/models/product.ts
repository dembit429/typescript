import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/db";

interface ProductAttributes {
  id: string;
  brand: string;
  model: string;
  price: number;
  category_id: string;
}

type ProductCreationAttributes = Optional<ProductAttributes, "id">;

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: string;
  public brand!: string;
  public model!: string;
  public price!: number;
  public category_id!: string;
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    brand: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
    indexes: [
      {
        unique: true,
        fields: ["brand", "model"],
      },
    ],
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export default Product;
