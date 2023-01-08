import { Category } from "./category";
import { omit } from "lodash";

describe("Category Tests", () => {
  test("constructor of category", () => {
    let category = new Category({ name: "Movie" });
    let props = omit(category.props, "created_at");
    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: "Movie",
      description: "Some description",
      is_active: false,
      created_at: created_at,
    });
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "Some description",
      is_active: false,
      created_at: created_at,
    });

    category = new Category({
      name: "Movie",
      description: "Other description",
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      description: "Other description",
    });

    category = new Category({
      name: "Movie",
      is_active: true,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: true,
    });

    created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at: created_at,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      created_at: created_at,
    });
  });
});
