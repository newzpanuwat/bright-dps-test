// Test.tsx

import React, { useEffect, useState } from "react";
import { fetchData } from "../../api/fetchData";
import { Pokemon } from "../../interface/pokemon";
import Button from "src/components/Button";

const PokeTable: React.FC = () => {
  const [data, setData] = useState<Pokemon[]>([]);
  const [perPage, setPerPage] = useState<number>(20);

  useEffect(() => {
    fetchData(`/pokemon?limit=${perPage}`)
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [perPage]);

  const onClickPerPage = (value: number) => {
    let currentVal: number = perPage;
    currentVal = currentVal + value;
    if (currentVal >= 200) {
      return alert("Stop add more, Now limit is 200 records.");
    }
    setPerPage(currentVal);
  };

  return (
    <div style={{ margin: "10pt" }}>
      <div className="h4-typo">Pokemon</div>
      <table style={{ borderCollapse: "collapse", width: "100%", marginTop: "10pt" }}>
        <thead>
          <tr>
            <th className="table-border">No.</th>
            <th className="table-border">Name</th>
            <th className="table-border">Url</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td className="table-border">{idx + 1}</td>
              <td className="table-border">{item.name}</td>
              <td className="table-border">
                <a href={item.url} target="_blank">
                  {item.url}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ margin: "15px", display: "flex", justifyContent: "center" }}>
        <Button onClick={() => onClickPerPage(50)} label="Load more..." />
      </div>
    </div>
  );
};

export default PokeTable;
