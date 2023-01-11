import { Category, CategoryProperties } from "./category";
import { omit, uniqueId } from "lodash";
import { type } from "os";
import { validate as uuidValidate } from "uuid";

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

  test("getter of name prop", () => {
    const category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");
  });

  test("getter and setter of description prop", () => {
    let category = new Category({ name: "Movie" });
    expect(category.description).toBeNull();
    category = new Category({
      name: "Movie",
      description: "Some description",
    });
    expect(category.description).toBe("Some description");

    category = new Category({ name: "Movie" });
    category["description"] = "Other description";
    expect(category.description).toBe("Other description");

    category["description"] = undefined;
    expect(category.description).toBeNull();
  });

  test("getter and setter of is_active prop", () => {
    let category = new Category({ name: "Movie" });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: false });
    expect(category.is_active).toBeFalsy;

    category = new Category({ name: "Movie", is_active: true });
    expect(category.is_active).toBeTruthy;

    category["is_active"] = false;
    expect(category.is_active).toBeFalsy;
  });

  test("getter of created_at prop", () => {
    let category = new Category({
      name: "Movie",
    });

    expect(category.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at: created_at,
    });

    expect(category.created_at).toBe(created_at);
  });

  test("id field", () => {
    type CategoryDate = { props: CategoryProperties; id?: string };
    const data: CategoryDate[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: "98769878-d13b-49f9-9de8-e39488f69733" },
    ];

    data.forEach((i) => {
      const category = new Category(i.props, i.id);
      expect(category.id).not.toBeNull;
      expect(uuidValidate(category.id)).toBeTruthy;
    });
  });
});
