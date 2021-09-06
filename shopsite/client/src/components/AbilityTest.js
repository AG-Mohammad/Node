import { useEffect, useState } from "react";
import Can from "./components/can";
import { useRoleContext } from "../context/UserInfoContext";
import defineRulesFor from "./ability";

function AbilityTest() {
  const role = useRoleContext();
  const [cans, setCans] = useState("NotInitialized");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCans();
    setLoading(true);
    setCans(
      <>
        <Can I="Create" a="User">
          Create User
        </Can>
        <br />
        <Can I="Read" a="User">
          Read User
        </Can>
        <br />
        <Can I="Update" a="User">
          Update User
        </Can>
        <br />
        <Can I="Delete" a="User">
          Delete User
        </Can>
        <br />
        <hr />
        <br />
        <Can I="Create" a="Product">
          Create Product
        </Can>
        <br />
        <Can I="Read" a="Product">
          Read Product
        </Can>
        <br />
        <Can I="Update" a="Product">
          Update Product
        </Can>
        <br />
        <Can I="Delete" a="Product">
          Delete Product
        </Can>
      </>
    );
  }, []);
  return (
    <div>
      <p>{defineRulesFor(role).forEach((roles) => roles)}</p>
      <br />
      {loading ? cans : "Lesa"}
    </div>
  );
}

export default AbilityTest;
