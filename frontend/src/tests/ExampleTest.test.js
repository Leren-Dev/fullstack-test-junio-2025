import { expect, test } from "vitest";

const user = {
  name: "Leren",
  age: 5,
};

test("Leren is 5 years old", () => {
  expect(user.name).toBe("Leren");
  expect(user.age).toBe(5);
});
