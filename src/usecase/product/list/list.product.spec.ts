import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const productA = ProductFactory.create("a", "Product A", 100);
const productB = ProductFactory.create("b", "Product B", 200);

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([productA, productB])),
  };
};

describe("Unit test for listing product use case", () => {
  it("should list products", async () => {
    const productRepository = MockRepository();
    const productListUseCase = new ListProductUseCase(productRepository);

    const output = await productListUseCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toEqual(productA.id);
    expect(output.products[0].name).toEqual(productA.name);
    expect(output.products[0].price).toEqual(productA.price);
    expect(output.products[1].id).toEqual(productB.id);
    expect(output.products[1].name).toEqual(productB.name);
    expect(output.products[1].price).toEqual(productB.price);
  });
});
