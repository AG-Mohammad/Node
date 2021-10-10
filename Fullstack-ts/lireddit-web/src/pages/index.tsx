import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { UrqlClient } from "../utils/UrqlClient";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = usePostsQuery();

  return (
    <>
      <NavBar />
      <div>test</div>
      <hr
        style={{
          color: "#000000",
          backgroundColor: "#000000",
          height: 0.5,
          borderColor: "#000000",
        }}
      />

      {!data ? (
        <>{"Loading..."}</>
      ) : (
        data.getPosts.map((p) => (
          <>
            {" "}
            <div key={p.id}>{p.title}</div>
            <hr />
          </>
        ))
      )}
    </>
  );
};
export default withUrqlClient(UrqlClient, { ssr: true })(Index);
