import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { OutputListProductDTO } from "./list.product.dto";
import ListProductUseCase from "./list.product.usecase";

describe("Test list product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list products", async () => {
    const productRepository = new ProductRepository();
    const useCase = new ListProductUseCase(productRepository);

    const product1 = new Product("123", "Product 1", 100);
    const product2 = new Product("321", "Product 2", 100);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const input = { id: "123" };

    const output: OutputListProductDTO = {
      products: [
        {
          id: "123",
          name: "Product 1",
          price: 100,
        },
        {
          id: "321",
          name: "Product 2",
          price: 100,
        },
      ],
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });
});
