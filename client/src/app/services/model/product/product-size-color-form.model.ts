import { ProductSizeColor } from "./product-size-color.model";
import { Product } from "./product.model";

export interface ProductSizeColorForm {
    typeform: number,
    product: Product,
    productSizeColor: ProductSizeColor
}