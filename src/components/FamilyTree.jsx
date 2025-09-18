import React, { useEffect, useState } from "react";
import axios from "axios";
import Tree from "react-d3-tree";

const StyledFamilyTree = () => {
  const [treeData, setTreeData] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const peopleRes = await axios.get(`${API_URL}/api/people`);
        const relRes = await axios.get(`${API_URL}/api/relationships`);
        const people = peopleRes.data;
        const relationships = relRes.data;

        // --- Helpers ---
        const getChildren = personId =>
          relationships
            .filter(r => r.from._id === personId && r.type === "parent")
            .map(r => r.to);

        const getSpouses = personId =>
          relationships
            .filter(r => r.from._id === personId && r.type === "spouse")
            .map(r => r.to);

        // Build node recursively with styling
        const buildNode = person => {
          const spouses = getSpouses(person._id);
          const children = getChildren(person._id).map(buildNode);

          // Base node
          const node = {
            name: person.firstName,
            attributes: {
              LastName: person.lastName,
              Gender: person.gender
            },
            children: []
          };

          // Add spouses as children side by side
          spouses.forEach(spouse => {
            node.children.push({
              name: spouse.firstName,
              attributes: {
                LastName: spouse.lastName,
                Gender: spouse.gender,
                Spouse: person.firstName
              },
              children: [] // Children will appear under the main person
            });
          });

          // Add children under main person
          if (children.length > 0) {
            node.children.push(...children);
          }

          return node;
        };

        // Find roots (no parents)
        const roots = people.filter(
          p => !relationships.some(r => r.to._id === p._id && r.type === "child")
        );

        const treeNodes = roots.map(root => buildNode(root));
        setTreeData(treeNodes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [API_URL]);

  if (!treeData) return <div>Loading family tree...</div>;

  // --- Node styling ---
  const renderNode = ({ nodeDatum }) => (
    <g>
      <circle
        r={20}
        fill={nodeDatum.attributes?.Gender === "Male" ? "#4C91FF" : "#FF6B6B"}
      />
      <text fill="black" x="25" y="-5" fontSize="14">
        {nodeDatum.name} {nodeDatum.attributes?.LastName}
      </text>
    </g>
  );

  return (
    <div id="treeWrapper" style={{ width: "100%", height: "100vh" }}>
      <Tree
        data={treeData}
        renderCustomNodeElement={renderNode}
        orientation="vertical"
        collapsible={true}
        pathFunc="elbow"
        translate={{ x: window.innerWidth / 2, y: 50 }}
        separation={{ siblings: 1, nonSiblings: 2 }}
      />
    </div>
  );
};

export default StyledFamilyTree;
