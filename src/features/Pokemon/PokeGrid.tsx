import _ from "lodash";
import React, { useEffect, useState } from "react";
import { fetchData } from "src/api/fetchData";
import { Pokemon } from "src/interface/pokemon";
import { baseImageURL, defaultValues } from "src/util/global";
import { capitalize } from "src/util/capitalize";

const PokeGrid: React.FC = () => {
  const [data, setData] = useState<Pokemon[]>([]);
  const [sortedID, setSortedID] = useState<Pokemon[]>([]);
  const [page, setPage] = useState<number>(1);
  const [offset, setOffSet] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("id");

  const currentPageAmount: number = data.length;

  useEffect(() => {
    fetch();
    setSortBy("id");
  }, [offset]);

  const fetch = () => {
    fetchData(`/pokemon?limit=${defaultValues}&offset=${offset}`)
      .then((result) => {
        setData(result);
        setSortedID(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

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

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value);
    if ((event.target.value || sortBy) === "name") {
      let orderName = _.orderBy(data, ["name"], ["asc"]);
      setData(orderName);
    }
    if ((event.target.value || sortBy) === "id") {
      setData(sortedID);
    }
  };

  return (
    <>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="text-body1 h5-typo title-label">All the Pokemon!</div>
        <div className="text-body1 h5-typo mgt-10 mgr-5">
          <div>
            <label className="cap-typo">
              <input
                type="radio"
                name="sortName"
                value="name"
                checked={sortBy === "name"}
                onChange={handleOptionChange}
                style={{ margin: "10px" }}
              />
              Sort Name
            </label>

            <label className="cap-typo">
              <input
                type="radio"
                style={{ margin: "10px" }}
                name="sortID"
                value="id"
                checked={sortBy === "id"}
                onChange={handleOptionChange}
              />
              Sort ID
            </label>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="columns">
        {data.map((item, idx) => (
          <div className="poke-card-section mgl-3-5 mgb-1-5" key={idx}>
            <div className="flex">
              <div className="circle">
                <img src={`${baseImageURL}/${item.url.split("/")[6]}.png`}></img>
              </div>
              <div className="h5-typo" style={{ margin: "3rem" }}>
                {capitalize(item.name)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="text-body1 h5-typo text-primary-color cursor mgl-4 mgb-1">
          <a onClick={() => onClickPrev(defaultValues)}>Previous {page === 1 ? "" : currentPageAmount}</a>
        </div>
        <div className="text-body1 h5-typo text-primary-color cursor mgr-5">
          <a onClick={() => onClickNext(defaultValues)}>Next {currentPageAmount}</a>
        </div>
      </div>
    </>
  );
};

export default PokeGrid;
