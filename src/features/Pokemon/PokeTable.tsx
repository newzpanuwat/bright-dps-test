// Test.tsx

import React, { useEffect, useState } from "react";
import { fetchData } from "../../api/fetchData";
import { Pokemon } from "../../interface/pokemon";

const PokeTable: React.FC = () => {
  const [data, setData] = useState<Pokemon[]>([]);
  const [perPage, setPerPage] = useState<number>(10);

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
    setPerPage(value);
  };

  return (
    <div>
      <div className="body2-typo">Total: {data.length}</div>
      <ul>
        {data.map((item, idx) => (
          <li className="body2-typo text-body-color" key={idx}>
            {item.name}:
            <a href={item.url} target="_blank">
              detail
            </a>
          </li>
        ))}
      </ul>
      <button onClick={() => onClickPerPage(20)}>Per Page 20 </button>
      <button onClick={() => onClickPerPage(50)}>Per Page 50 </button>
      <button onClick={() => onClickPerPage(100)}>Per Page 100 </button>
    </div>
  );
};

export default PokeTable;
