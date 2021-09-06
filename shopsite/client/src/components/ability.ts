import { AbilityBuilder, Ability, AbilityClass } from "@casl/ability";

type Actions = "manage" | "Create" | "Read" | "Update" | "Delete";
type Subjects = "User" | "Product" | "all";
let data: any = "";
export type AppAbility = Ability<[Actions, Subjects]>;
export const AppAbility = Ability as AbilityClass<AppAbility>;

export default function defineRulesFor(role: string, newData: any) {
  if (!!newData) {
    data = newData;
  }
  const { can,cannot, rules } = new AbilityBuilder(AppAbility);
  let test: any;

  if (role === "Admin") {
    can("manage", "all");
    cannot('Create','Product')
  } else if (role === "Seller") {
    if (data != null) {
      test = data["User"]!;
      can(test, "User");
      test = data["Products"]!;
      can(test, "Product");
    }
  } else if (role === "User") {
    if (data != null) {
      test = data["User"]!;
      can(["Create", "Read", "Update"], "User");
      test = data["Products"]!;
      can(test, "Product");
    }
  } else {
    can("Create", "User");
  }

  //==================================================================
  // if (role === "Admin") {
  //   can("manage", "all");
  // } else if (role === "Seller") {
  //   can(['Read','Update'],"User")
  //   can(['Create','Read','Update'],"Product")
  // } else if (role === "User") {
  //   can(['Read','Update'],"User")
  //   can('Read',"Product")
  // }
  // else {
  //   can("Create", "User");
  //   console.log("Guest")
  // }

  return rules;
}

export function buildAbilityFor(role: string, newData: any): AppAbility {
  if (!!newData) {
    data = newData;
  }
  return new AppAbility(defineRulesFor(role, data), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    detectSubjectType: (object: any) => object!.type,
  });
}
