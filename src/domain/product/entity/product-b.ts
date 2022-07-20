import Product from "./product";
import ProductInterface from "./product.interface";

export default class ProductB extends Product implements ProductInterface {
  constructor(id: string, name: string, price: number) {
    super(id, name, price);
  }

  get price(): number {
    return super.price * 2;
  }
}
