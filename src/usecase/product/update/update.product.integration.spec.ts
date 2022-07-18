import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputFindProductDTO } from "../find/find.product.dto";
import FindProductUseCase from "../find/find.product.usecase";
import { OutputUpdateProductDTO } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update product use case", () => {
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

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const useCase = new UpdateProductUseCase(productRepository);
    const findUseCase = new FindProductUseCase(productRepository);

    const product = new Product("123", "Product 1", 100);

    await productRepository.create(product);

    product.changeName("Product 1 Updated");
    product.changePrice(200);

    await useCase.execute(product);

    const input: InputFindProductDTO = { id: "123" };

    const output: OutputUpdateProductDTO = {
      id: "123",
      name: "Product 1 Updated",
      price: 200,
    };

    const result = await findUseCase.execute(input);

    expect(result).toEqual(output);
  });
});
