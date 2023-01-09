const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the deterministicPartitionKey when input a string partition key ", () => {
    const partitionKey = "123";
    const key = deterministicPartitionKey({partitionKey});
    expect(key).toBe(crypto.createHash("sha3-512").update(partitionKey).digest("hex"));
  }); 
  it("Returns the deterministicPartitionKey when input a number partition key ", () => {
    const partitionKey = 123;
    const key = deterministicPartitionKey({partitionKey});
    expect(key).toBe(crypto.createHash("sha3-512").update(`${partitionKey}`).digest("hex"));
  }); 
  it("Returns the deterministicPartitionKey for the whole input when partition key is not present", () => {
    const key = deterministicPartitionKey({});
    expect(key).toBe(crypto.createHash("sha3-512").update(`{}`).digest("hex"));
  });
  it("Returns the deterministicPartitionKey when input key is greater than default of 256 ", () => {
    const partitionKey = "123456789";
    const key = deterministicPartitionKey({partitionKey},"0", 5);
    expect(key).toBe(crypto.createHash("sha3-512").update(partitionKey).digest("hex"));
  });
  it("Throw error when stringification is not possible", () => {
    const circularDependencyObj = {};
    circularDependencyObj.prop = circularDependencyObj;
    expect(
      deterministicPartitionKey(circularDependencyObj)
    ).toThrow();
  });
});
