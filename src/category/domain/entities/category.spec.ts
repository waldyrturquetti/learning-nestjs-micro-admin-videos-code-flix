import { Category } from "./category";

describe("Category Tests", () => {
  test("constructor of category", () => {
    // Triple AAA - Arrange Act Assert

    const created_at = new Date();
    // Arrange
    const props = {
      name: "Movie",
      description: "some description",
      is_active: true,
      created_at: created_at,
    };

    // Act
    const category = new Category(props);

    // Assert
    // expect(category.name).toBe("Movie");
    // expect(category.description).toBe("some description");
    // expect(category.is_active).toBeTruthy;
    // expect(category.created_at).toBe(created_at);

    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      is_active: true,
      created_at: created_at,
    });
  });
});
