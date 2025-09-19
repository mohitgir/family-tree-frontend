import React, { useEffect, useState } from "react";
import axios from "axios";

const FamilyTree = () => {
  const [user, setUser] = useState({});
  const [relations, setRelations] = useState({});
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + "/api/test").then((res) => {
      console.log(res);
      setUser(res.data.currentUser);
      setRelations(res.data.relationships);
    });
  }, []);

  return (
    <div className="container">
      <h1 className="text-dark">Family Tree</h1>
      <div className="border">
        <h2>Structure</h2>
        <div className="border m-5">
          {/* {JSON.stringify(user)} */}
          {Object.entries(user).map(([key, value], index) => (
            <p key={index}>
              {index + 1}. {key}: {value}
            </p>
          ))}
        </div>
        <div className="border m-5">
          {/* {JSON.stringify(relations)} */}

          {Object.entries(relations).map(([key, value], index) => (
            <p key={index}>
             <b> {index + 1}. {key}</b>:
          {JSON.stringify(value)}

              {/* {value.map((item, index1) => {
                return Object.entries(item).map(
                  ([key2, value2], index3) => (
                    <p key={index}>
                      {index3 + 1}. {key2}: {JSON.stringify(value2)}
                    </p>
                  )
                );
              })} */}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FamilyTree;
