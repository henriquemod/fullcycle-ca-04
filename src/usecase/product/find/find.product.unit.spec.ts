import Product from "../../../domain/product/entity/product";
import { OutputFindProductDTO } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Product 1", 100);

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
  };
};
describe("Unit Test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const useCase = new FindProductUseCase(productRepository);

    const input = { id: "123" };

    const output: OutputFindProductDTO = {
      id: "123",
      name: "Product 1",
      price: 100,
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });

  it("it should not find a product", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error(" Product not found");
    });

    const useCase = new FindProductUseCase(productRepository);

    const input = { id: "123" };

    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow(" Product not found");
  });
});
