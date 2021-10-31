import React, { useState } from "react";
import { useHistory } from "react-router";
import styles from "./SearchBar.module.css";
import { getAllPaseadores } from "../../actions";
import { useDispatch } from "react-redux";

const SearchBar = ({ page, pageSize }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const token = localStorage.getItem("userToken");

  const handleOnChange = (event) => {
    setName(event.target.value);
  };

  const handleOnClick = () => {
    // history.push(`/main?name=${name}`)
    dispatch(getAllPaseadores({ name, token, page, pageSize }));
    setName("");
  };

  return (
    <div className={styles.buscarcaja}>
      <input
        className={styles.buscartxt}
        onChange={handleOnChange}
        value={name}
        type="text"
        placeholder="Search..."
      />
      <button
        className={styles.buscarbtn}
        // type="submit"
        onClick={handleOnClick}
      >
        <i class="fas fa-search"></i>
      </button>
    </div>
  );
};
export default SearchBar;
