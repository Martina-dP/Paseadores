import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import Carrusel from "../Carrusel/Carrusel";
import Nav from "./Nav/Nav";
import style from "../UsersCards/UsersCards.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllPaseadores, getUserFavorites } from "../../actions/index";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import fotoFondo from "../../media/proceso2.jpg";
import fotoFondo2 from "../../media/foto2Service.jpg";
import fotoFondo3 from "../../media/premiumcortada.jpg";
import fotoFondo4 from "../../media/fotoAbout.jpg";

const UsersCards = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allPaseadores);

  const favorites = useSelector((state) => state.favorites);

  const [inputFilters, setInputFilters] = useState({
    min: "",
    max: "",
    ubication: "",
  });
  const [selectFilters, setSelectFilters] = useState({
    horario: "",
    service: "",
  });
  const [sortData, setSortData] = useState({ sortField: "" });

  // Paginado
  const [page, setPage] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setLimitPerPage] = useState(5);

  const ubica = useSelector((state) => state.ubication);

  const token = localStorage.getItem("userToken");
  const walker = localStorage.getItem("userWalker");
  const id = localStorage.getItem("userId");
  const admin = localStorage.getItem("userAdmin");

  useEffect(() => {
    dispatch(
      getAllPaseadores({
        page,
        pageSize,
        inputFilters,
        selectFilters,
        sortData,
        token,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, selectFilters, sortData, dispatch]);

  useEffect(() => {
    if (walker === "false" && admin === "false") {
      dispatch(getUserFavorites(id, token));
    }
  }, []);

  function handleNextPage(e) {
    e.preventDefault();
    if (page < allUsers.totalPages) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setPage(page + 1);
    } else {
      Swal.fire({
        title: "Ultima pagina !",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }
  }

  function handlePrevPage(e) {
    e.preventDefault();
    if (page === 0) {
      Swal.fire({
        title: "Primer pagina !",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    } else {
      setPage(page - 1);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }
  function handleSort(event) {
    event.preventDefault();
    setSortData({
      ...sortData,
      sortField: event.target.name,
      isSortAscending: event.target.value === "ASC" ? true : false,
    });
  }

  function handleFiltersOnChange(event) {
    const { value, name } = event.target;
    setInputFilters({ ...inputFilters, [name]: value });
  }

  function handleFiltersSubmit(event) {
    event.preventDefault();
    const { min, max } = inputFilters;
    if (min && max && min > max) {
      setInputFilters({ ...inputFilters, min: "", max: "" });
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El precio minimo debe ser menor que el precio máximo",
        showDenyButton: false,
      });
    }

    dispatch(
      getAllPaseadores({
        page,
        pageSize,
        inputFilters,
        selectFilters,
        sortData,
        token,
      })
    );
  }

  function handleSelectFilters(event) {
    const { value, name } = event.target;
    setSelectFilters({ ...selectFilters, [name]: value });
  }

  function handleOnClick(event) {
    event.preventDefault();
    setSelectFilters({ horario: "", service: "" });
    setInputFilters({ min: "", max: "", ubication: "" });
    setSortData({ sortField: "" });
    setPage(0);
  }

  return (
    <div className={style.container}>
      <Nav />
      <img className={style.fotoFondo} src={fotoFondo} alt="fotoFondo" />
      {allUsers.content?.length > 1 ? (
        <img className={style.fotoFondo2} src={fotoFondo2} alt="fotoFondo" />
      ) : null}
      {allUsers.content?.length > 3 ? (
        <img className={style.fotoFondo3} src={fotoFondo3} alt="fotoFondo" />
      ) : null}
      {allUsers.content?.length > 4 ? (
        <img className={style.fotoFondo4} src={fotoFondo4} alt="fotoFondo" />
      ) : null}
      <div className={style.containerDOS}>
        <div className={style.carrusel}>
          <Carrusel />
        </div>
        <div className={style.costado}>
          <div>
            <select
              name="reputation"
              className={style.rep}
              onChange={handleSort}
              value={sortData.sortField}
            >
              <option value="order"> Ordenar por Reputacion </option>
              <option value="DESC"> Mayor reputacion </option>
              <option value="ASC"> Menor reputacion </option>
            </select>
          </div>
          <div>
            <select
              name="price"
              className={style.pre}
              onChange={handleSort}
              value={sortData.sortField}
            >
              <option value="order"> Ordenar por Precio</option>
              <option value="DESC"> Mayor precio </option>
              <option value="ASC"> Menor precio </option>
            </select>
          </div>
          <form onSubmit={handleFiltersSubmit} name={"price"}>
            <div className={style.precio}>
              <label className={style.pri}> Precio : </label>
              <hr></hr>
              <input
                className={style.min}
                type="number"
                placeholder=" $ Mínimo "
                name="min"
                value={inputFilters.min}
                onChange={handleFiltersOnChange}
              />

              <input
                className={style.max}
                type="number"
                placeholder=" $ Maximo "
                name="max"
                value={inputFilters.max}
                onChange={handleFiltersOnChange}
              />
              <button className={style.btn}> Buscar </button>
            </div>
          </form>
          <div>
            <form
              autocomplete="off"
              className={style.precio}
              onSubmit={handleFiltersSubmit}
            >
              <label className={style.ubi}> Ubicacion : </label>
              <input
                className={style.zon}
                type="search"
                placeholder="Zona"
                name="ubication"
                value={inputFilters.ubication}
                onChange={handleFiltersOnChange}
                list="ubi"
              />
              <datalist id="ubi">
                {ubica?.map((t) => {
                  return <option key={t} value={t}></option>;
                })}
              </datalist>
              <button className={style.btn}> Buscar </button>
            </form>
            <div>
              <select
                className={style.hora}
                onChange={handleSelectFilters}
                name={"horario"}
                value={selectFilters.horario}
              >
                <option> Filtrar por Horario </option>
                <option value="Mañana"> Mañana </option>
                <option value="Tarde/Noche"> Tarde </option>
                <option value="Full"> Todos </option>
              </select>
            </div>
            <div>
              <select
                className={style.serv}
                onChange={handleSelectFilters}
                name={"service"}
                value={selectFilters.service}
              >
                <option> Filtrar por Servicio </option>
                <option value="Paseador"> Paseador </option>
                <option value="Cuidador"> Cuidador </option>
                <option value=" Paseador y Cuidador">
                  {" "}
                  Paseador y Cuidador{" "}
                </option>
              </select>
            </div>
            <div>
              <button className={style.atc} onClick={handleOnClick}>
                {" "}
                Todos los Paseadores{" "}
              </button>
              <Link to="/cardsUsers/map">
                <button className={style.atc}>Ver en mapa</button>
              </Link>
            </div>
          </div>
        </div>

        {/* <div className = {style.premium}>
          {usersPremium.length > 0 ? (
            usersPremium.map((pr) => {
              return (
                <CardCarrusel
                    key={pr.id}
                    id={pr.id}
                    name={pr.name}
                    surname={pr.surname}
                    image={pr.image}
                    />
                    );
                  })
                  ) : (
                    <div>
                    <p>No hay usuarios premium</p>
                    </div>
                    )}
                  </div> */}

        <div className={style.cards}>
          {allUsers.content?.length > 0 ? (
            allUsers.content.map((el) => {
              var fv;

              for (var i = 0; i < favorites.length; i++) {
                if (favorites[i] === el.id) {
                  fv = true;
                }
              }

              return (
                <Card
                  key={el.id}
                  id={el.id}
                  name={el.name}
                  surname={el.surname}
                  image={el.image}
                  service={el.service}
                  price={el.price}
                  reputation={el.reputation}
                  description={el.description}
                  ubication={el.ubication}
                  fv={fv}
                />
              );
            })
          ) : (
            <div>
              <p>No se encontraron usuarios</p>
            </div>
          )}

          <div className={style.pagination}>
            {/* {page === 0 ? null : ( */}
            <button className={style.prev} onClick={handlePrevPage}>
              <p>&#60;</p>
            </button>
            {/* )} */}
            {/* {page === allUsers.totalPages - 1 ? null : ( */}
            <button className={style.next} onClick={handleNextPage}>
              <p>&#62;</p>
            </button>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersCards;
