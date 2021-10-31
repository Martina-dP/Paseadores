import React, { useEffect, useState } from "react";
import Nav from "../../ClientsComponents/perfilCliente/nav/Nav";
import { useDispatch, useSelector } from "react-redux";
import { getForListFav, getUserFavorites } from "../../../src/actions/index";
import styles from "./ListaFav.module.css";
import UserFav from "./UserFav";

const Admin = () => {
  const dispatch = useDispatch();
  const id = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken");
  const favorites = useSelector((state) => state.favorites);
  const dataFavorites = useSelector((state) => state.dataFavorites);

  //console.log(dataFavorites)
  //console.log("aaaaaaaaaa")
  useEffect(() => {
    dispatch(getForListFav(id, token));
    dispatch(getUserFavorites(id, token));
  }, [dispatch]);

  return (
    <div>
      <Nav />

      <div className={styles.wrapper}>
        {dataFavorites?.length > 0 ? (
          dataFavorites.map((el) => {
            console.log("vvvvvvvvvvvvvvvv");
            console.log(el);
            var fv;
            for (var i = 0; i < favorites.length; i++) {
              if (favorites[i] === el.id) {
                fv = true;
              }
            }

            return (
              <UserFav
                key={el.id}
                id={el.id}
                name={el.name}
                surname={el.surname}
                image={el.image}
                service={el.service}
                price={el.price}
                reputation={el.reputation}
                description={el.description}
                fv={fv}
              />
            );
          })
        ) : (
          <div>
            <p>No se encontraron usuarios</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
