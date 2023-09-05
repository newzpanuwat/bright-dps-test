import "src/custom.css";
import RadioButtonGroup from "src/components/RadioButtonGroup";
import React, { useEffect, useState } from "react";
import { fetchData } from "src/api/fetchData";
import { Pokemon } from "src/interface/pokemon";
import { baseImageURL, defaultValues } from "src/util/global";

const PokeGrid: React.FC = () => {
  const [data, setData] = useState<Pokemon[]>([]);
  const [page, setPage] = useState<number>(1);
  const [offset, setOffSet] = useState<number>(0);

  const currentPageAmount = data.length;

  useEffect(() => {
    fetchData(`/pokemon?limit=${defaultValues}&offset=${offset}`)
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [offset]);

  const onClickNext = (value: number) => {
    let currentVal: number = 0;

    if (page === 1) {
      currentVal = 0;
    }
    let currentPage = 1;
    currentPage = page + 1;
    currentVal = offset + value;

    setOffSet(currentVal);
    setPage(currentPage);
  };

  const onClickPrev = (value: number) => {
    let currentVal: number = 0;

    if (page === 1) {
      currentVal = 0;
      return alert("Can not go back");
    }
    currentVal = offset - value;
    let currentPage = 1;
    currentPage = page - 1;

    setOffSet(currentVal);
    setPage(currentPage);
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="text-body1 h5-typo" style={{ marginTop: "10rem", marginLeft: "3rem", marginBottom: "1rem" }}>
          All the Pokemon!
        </div>
        <div className="text-body1 h5-typo" style={{ marginTop: "10rem", marginRight: "5rem" }}>
          <RadioButtonGroup />
        </div>
      </div>

      {/* Grid */}
      <div className="columns">
        {data.map((item, idx) => (
          <div key={idx} style={{ marginLeft: "3.5rem", marginBottom: "1.5rem" }} className="poke-card-section">
            <div style={{ display: "flex" }}>
              <div className="circle">
                <img src={`${baseImageURL}/${item.url.split("/")[6]}.png`}></img>
              </div>
              <div className="h5-typo" style={{ margin: "3rem" }}>
                {item.name}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          className="text-body1 h5-typo text-primary-color cursor"
          style={{ marginLeft: "4rem", marginBottom: "1rem" }}
        >
          <a onClick={() => onClickPrev(defaultValues)}>Previous {page == 1 ? "" : currentPageAmount}</a>
        </div>
        <div className="text-body1 h5-typo text-primary-color cursor" style={{ marginRight: "5rem" }}>
          <a onClick={() => onClickNext(defaultValues)}>Next {currentPageAmount}</a>
        </div>
      </div>
    </>
  );
};

export default PokeGrid;
