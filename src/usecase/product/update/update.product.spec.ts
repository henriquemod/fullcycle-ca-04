import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputUpdateProductDTO } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";

const product_a = ProductFactory.create("a", "Product A", 100);
const product_b = ProductFactory.create("b", "Product B", 100);

const input_a: InputUpdateProductDTO = {
  id: product_a.id,
  name: "Product A Updated",
  price: 200,
};

const input_b: InputUpdateProductDTO = {
  id: product_b.id,
  name: "Product B Updated",
  price: 300,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it("should update a product A", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockReturnValue(Promise.resolve(product_a));
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const output = await productUpdateUseCase.execute(input_a);

    expect(output).toEqual(input_a);
  });

  it("should update a product B", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockReturnValue(Promise.resolve(product_b));
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const output = await productUpdateUseCase.execute(input_b);

    expect(output).toEqual({
      id: product_b.id,
      name: "Product B Updated",
      price: 300 * 2,
    });
  });
});
