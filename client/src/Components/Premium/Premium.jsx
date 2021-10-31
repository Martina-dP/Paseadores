import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link, useParams, useHistory } from "react-router-dom";
import { getPaseadorForId } from "../../actions/index";
import style from "./Premium.module.css";
import Swal from "sweetalert2";
import dotenv from "dotenv";
dotenv.config();
const baseURL = process.env.REACT_APP_API || "http://localhost:3001";

const token = localStorage.getItem("userToken");
const id = localStorage.getItem("userId");
const header = {
  Authorization: `Bearer ${token}`,
};

const stripePromise = loadStripe(
  "pk_test_51Ji5fMGdSvtdCP45ybVuEagcWsHbTdQPRvOmX3HX4i3qLK69ougjRbSjEYQCZCVCZ9J0WO6o7jc1ZFs80MR1pyZF00yadaq1Sb"
);

const Form = () => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      history.push(`/login`);
    }
    dispatch(getPaseadorForId(id, token));
  }, [dispatch, id]);

  const walker = useSelector((state) => state.detailWalker);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      const { id } = paymentMethod;
      const { data } = await axios.post(
        `${baseURL}/updatePremium`,
        {
          id,
          amount: 1200,
          email: walker.email,
        },
        { headers: header }
      );
      Swal.fire({
        icon: "success",
        title: "Pago exitoso!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(data);
      history.push(`/walker/perfil/${walker.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={style.subTitle}>Ingrese los datos de su tarjeta</h2>
      <div className={style.datosForm}>
        <CardElement />
      </div>
      <div className={style.containerBnt}>
        {loading === false ? (
          <button className={style.btn}> Pagar </button>
        ) : (
          <label className={style.procesando}> Procesando... </label>
        )}
      </div>
    </form>
  );
};

function Premium() {
  const walker = useSelector((state) => state.detailWalker);
  return (
    <div className={style.container}>
      <div className={style.principal}>
        <h2 className={style.title}> Premium </h2>
        <Elements stripe={stripePromise}>
          <Form />
        </Elements>
        <div className={style.info}>
          <p className={style.infoTitle}>
            Contratando la cuenta premium a tan solo USD$12 por unica vez vas a
            poder contar con los siguientes beneficios exclusivos:
          </p>
          <div className={style.beneficios}>
            <p className={style.bene}>- Mejor posicionamiento.</p>
            <p className={style.bene}>
              - Subir ilimitadas publicaciones de tu trabajo.
            </p>
            <p className={style.bene}>
              - Mantener simpre el historial de los chats con los clientes.
            </p>
          </div>
        </div>
        <div className={style.containerVolver}>
          <Link className={style.btnV} to={`/walker/perfil/${walker.id}`}>
            <p>Atrás</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Premium;
