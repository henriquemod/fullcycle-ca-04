import { InputCreateProductDTO } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

let input_product_a: InputCreateProductDTO;

let input_product_b: InputCreateProductDTO;

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  beforeEach(() => {
    input_product_a = {
      type: "a",
      name: "Product A",
      price: 10,
    };

    input_product_b = {
      type: "b",
      name: "Product B",
      price: 10,
    };
  });
  it("should create a product A", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input_product_a);

    expect(output).toEqual({
      id: expect.any(String),
      name: input_product_a.name,
      price: input_product_a.price,
    });
  });

  it("should create a product B", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input_product_b);

    expect(output).toEqual({
      id: expect.any(String),
      name: input_product_b.name,
      price: input_product_b.price * 2,
    });
  });

  it("should throw an error when name is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input_product_a.name = "";

    await expect(productCreateUseCase.execute(input_product_a)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should throw an error when price is less than zero", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input_product_a.price = -1;

    await expect(productCreateUseCase.execute(input_product_a)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
