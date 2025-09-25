import { faker } from "@faker-js/faker";
import type { IProduct } from "../interfaces";


export const generateFakeData = ():IProduct[] => {
  const fakeData: {
    id: number;
    title: string;
    price: string;
    description: string;
  }[] = [];

  for (let i = 0; i < 10; i++) {
    fakeData.push({
      id: i + 1,
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
    });
  }

  return fakeData;
};
