import React, { useEffect, useState } from "react";
import axios from "axios";
import fileDownload from "js-file-download";

export default function TestPage() {
  const [state, setstate] = useState(true);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let id = params.get("DocID");
    async function getFile() {
      let res = await axios.get(
        "https://inspiredemo2.appiancloud.com/suite/webapi/taheel-apis-utilities-downloadDocument-v2?attachment=true&DocID=".concat(
          id
        ),
        {
          headers: {
            "appian-api-key":
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2YWUxNjY4OC1kMjMxLTRmZTQtYWYyMy0yYjQ5MWUyMjk2NDkifQ.sVfHaN8hSbxpZuuhIjq1Dd9YOEh_ckc2Qk9pCrX_3Sw",
          },
          responseType: "blob",
        }
      );
      if (res.status === 200) {
        fileDownload(res.data, "Test_", res.headers["content-type"]);
        console.log(res.headers["content-type"]);
        setstate(false);
      }
    }
    getFile();
  }, []);

  return <div>{{ true: "Loading...  ", false: "Done" }[state]}</div>;
}
