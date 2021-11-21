import { Category } from "../category/category.model";
import { Product } from "./product.model";

export interface ProductCategory {
    product: Product,
    category: Category
}