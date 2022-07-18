import Product from "./product";
import ProductInterface from "./product.interface";

export default class ProductB extends Product implements ProductInterface {
  constructor(id: string, name: string, price: number) {
    super(id, name, price);
  }

  // get id(): string {
  //   return super.id;
  // }

  // get name(): string {
  //   return super.name;
  // }

  get price(): number {
    return super.price * 2;
  }

  // changeName(name: string): void {
  //   super.changeName(name);
  //   this.validate();
  // }

  // changePrice(price: number): void {
  //   super.changePrice(price);
  //   this.validate();
  // }

  // validate(): boolean {
  //   if (super.id.length === 0) {
  //     throw new Error("Id is required");
  //   }
  //   if (super.name.length === 0) {
  //     throw new Error("Name is required");
  //   }
  //   if (super.price < 0) {
  //     throw new Error("Price must be greater than zero");
  //   }
  //   return true;
  // }
}
