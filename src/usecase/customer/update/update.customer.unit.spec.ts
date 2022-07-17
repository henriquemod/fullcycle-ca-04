import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDto } from "./update.customer.dto";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "John",
  new Address("Street 1", 1, "Zipcode 1", "City 1")
);

const input: InputUpdateCustomerDto = {
  id: customer.id,
  name: "John Updated",
  address: {
    street: "Street 1 Updated",
    number: 123,
    zip: "Zipcode 1 Updated",
    city: "City 1 Updated",
  },
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
  };
};

describe("Unit test for customer update use case", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await customerUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
