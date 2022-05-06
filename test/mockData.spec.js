// import { mount } from "@vue/test-utils";
import mockData from "@/helpers/mockData";

describe("Mock Data", () => {
  test("Mock Data returns data", () => {
    const { title, stars } = mockData();
    expect(title).not.toBe(null);
    expect(stars).not.toBe(null);
  });
});
