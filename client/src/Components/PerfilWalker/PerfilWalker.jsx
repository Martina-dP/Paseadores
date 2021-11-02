import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clientSendOrden,
  getOrdenCliente,
  getPaseadorForId,
  ordenAnswer,
  getPreferences,
  putDetailsUser,
  deleteImage,
} from "../../actions/index";
import style from "./PerfilWalker.module.css";
import foto1 from "../../media/foto1Service.jpg";
import { Link, useParams, useHistory } from "react-router-dom";
import fotosola from "../../media/fotosola.png";
import Swal from "sweetalert2";
import Nav from "./nav/Nav";
import swal from "sweetalert";
import patitallena from "../../media/patitallena.png";
import patitavacia from "../../media/patitavacia.png";
import chat from "../../media/chat.png";
import mediapatita from "../../media/mediapatita.png";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
import dotenv from "dotenv";
import Premium from "../../Premiums/Premium";
import Preferencias from "./Preferencias/Preferencias";
import MapView from "../../ComponentsMaps/MapView";
import SelectorMap from "../../ComponentsMaps/SelectorMap";
import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import LocationMarker from "../../ComponentsMaps/LocationMarker";
import AddMarkerToClick from "../../ComponentsMaps/AddMarkerToClick";
import styled from "styled-components";
import Modal from "./Modal/Modal";
import { useModal } from "./Modal/useModal";
import fotoFondo from "../../media/fondo14.jpeg"
const frontURL = process.env.REACT_APP || "http://localhost:3000";
dotenv.config();

// import Footer from './footer/Footer';

const PerfilWalker = () => {
  const id = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken");
  const dispatch = useDispatch();

  const history = useHistory();
  const [mapa, setMapa] = useState("");
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState("");

  const Walker = useSelector((state) => state.detailWalker);
  const allUsers = useSelector((state) => state.allPaseadores);

  console.log(Walker.hasOwnProperty("id"));

  const comment = useSelector((state) => state.comment);
  const ordensCliente = useSelector((state) => state.ordensCliente);
  const preferencias = useSelector((state) => state.preferencias);
  const [ordenload, setOrdenLoad] = useState(false);
  const [delImage, setDelImage] = useState(false);
  const baseURL = process.env.REACT_APP_API || "http://localhost:3001";
  const frontURL = process.env.REACT_APP || "http://localhost:3000";

  useEffect(() => {
    dispatch(getPreferences(id, token));
  }, [dispatch]);

  useEffect(() => {
    if (!token) {
      history.push(`/login`);
    }
    dispatch(getPaseadorForId(id, token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, token, delImage]);

  useEffect(() => {
    if (!Walker.latitude || !Walker.longitude) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          dispatch(
            putDetailsUser(
              {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
              id,
              token
            )
          );
          dispatch(getPaseadorForId(id, token));
        },
        function (error) {
          console.log(error);
        },
        { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
      );
    }
  }, []);

  // useEffect(() => {
  //   if (delImage === true) dispatch(getPaseadorForId(id, token));
  // }, [dispatch]);

  // const [file, setFile] = useState('')
  // const handleInputChange = (e) => {
  //     setFile(e.target.files[0])
  // };

  useEffect(() => {
    if (Walker.premium === false) handleNotPremium();
  }, []);

  useEffect(() => {
    dispatch(getOrdenCliente(id, token));
  }, [dispatch]);

  useEffect(() => {
    if (ordenload === true) {
      dispatch(getOrdenCliente(id, token));
    }
  }, [ordenload]);

  useEffect(() => {
    let ordenespendientes = ordensCliente.filter(
      (ordenes) =>
        ordenes.estadoReserva.toString() === "pendiente" &&
        ordenes.color.toString() === "yellow"
    );
    setTimeout(() => {
      if (ordenespendientes.length > 0) {
        swal({
          title: "Tenes ordenes pendientes que contestar!",
          info: "info",
        });
      }
    }, 1500);
  }, [dispatch]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (!preferencias.turno && preferencias.turno?.length === 0) {
  //       swal({
  //         title: "Elegí tus preferencias para que te empiecen a contratar",

  //         icon: "info",
  //       });
  //     }
  //   }, 1500);
  // }, [dispatch]);

  const [isOpen, openModal, closeModal] = useModal (false)

  const handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    let title = prompt(`Confirma reserva con ${Walker.name}`);

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent(
        {
          // will render immediately. will call handleEventAdd
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          // allDay: selectInfo.allDay
        },
        true
      ); // temporary=true, will get overwritten when reducer gives new events
    }
    dispatch(
      clientSendOrden(
        {
          fecha: selectInfo.startStr,
          userId: id,
        },
        token
      )
    );
  };
  function handleOnClick1(e) {
    e.preventDefault();
    setMapa("auto");
  }
  function handleOnClick2(e) {
    e.preventDefault();
    setMapa("manual");
  }


  const handleOpenImg = (event) => {
    setOpen(true);
    setImg(event.target.src);
  }

  const handleCloseImg = () => {
    setOpen(false);
    setImg("");
  }


  const handleEventClick = (clickInfo) => {
    if (clickInfo.event.extendedProps.estadoReserva === "pendiente") {
      Swal.fire({
        title: "Confirmar orden de paseo",
        html:
          `Tenes una solicitud!! ` +
          `Ingresa a ` +
          `<a href=${frontURL}/Walker/Cliente/${clickInfo.event.extendedProps.clientId}>Click aqui</a>` +
          ` para ver mas detalles del cliente y su ubicación`,
        icon: "info",
        showCloseButton: true,
        confirmButtonText: "Aceptar",
        showDenyButton: "true",
        denyButtonText: "Cancelar",
      }).then((respuesta) => {
        if (respuesta.isConfirmed) {
          swal({ text: "Orden confirmada", icon: "success" });
          dispatch(
            ordenAnswer(
              {
                id: clickInfo.event.extendedProps.idOrden,
                estadoReserva: "confirmada",
              },
              token
            )
          );
          setTimeout(() => {
            setOrdenLoad(true);
          }, 1000);
          setOrdenLoad(false);
        } else if (respuesta.isDenied) {
          swal({ text: "Orden rechazada", icon: "warning" });
          dispatch(
            ordenAnswer(
              {
                id: clickInfo.event.extendedProps.idOrden,
                estadoReserva: "rechazada",
              },
              token
            )
          );
          setTimeout(() => {
            setOrdenLoad(true);
          }, 1000);
          setOrdenLoad(false);
        }
      });
    }
  };

  const handleDelete = (public_id, token) => {
    swal({
      title: "¿Desea borrar imagen?",
      icon: "warning",
      buttons: ["Cancelar", "Aceptar"],
    }).then((respuesta) => {
      if (respuesta) {
        setTimeout(() => {
          setDelImage(true);
        }, 1000);
        swal({ text: "Imagen eliminada", icon: "success" });
        dispatch(deleteImage(public_id, token));
      }
      setTimeout(() => {
        setDelImage(false);
      }, 1000);
    });
  };


  useEffect(() => {
    if (!preferencias.turno && preferencias.turno?.length === 0)
    handleNotPreferncias();
  }, []);

  const handleNotPreferncias = () => {
    store.addNotification({
      title: "Preferencias",
      message: "Completa las preferncias de tu perfil para que te puedan contactar",
      type: "info",
      container: "top-right",
      insert: "top",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],

      dismiss: {
        duration: 3000,
      },
    });
  };

  const handleNotPremium = () => {
    store.addNotification({
      title: "Premium",
      message: "Hacete premium y conta con beneficios exclusivos",
      type: "info",
      container: "top-right",
      insert: "top",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],

      dismiss: {
        duration: 3000,
      },
    });
  };

  const Agenda = styled.div`
 .fc-direction-ltr .fc-button-group > .fc-button:not(:first-child) {
  margin-left: 1
  background-color:rgba(255, 217, 0, 0.7)
  color: blue;
  }
  .fc-direction-ltr .fc-button-group > .fc-button:not(:first-child) {
  margin-left: -1px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background-color: rgba(255, 217, 0, 0.6)
  }
  .gokzuw .fc .fc-button-primary:disabled {
  border-color: #2C3E50;
  border-color: var(--fc-button-border-color,rgb(206, 231, 167););
  background-color:rgba(255, 217, 0, 0.6);
  }


  .fc-direction-ltr .fc-button-group > .fc-button:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background-color: rgba(255, 217, 0, 0.6);
  color: whit;
  }
  .fc .fc-button-primary:disabled {
  border-color: #2C3E50;
  border-color: var(--fc-button-border-color,rgba(255, 217, 0, 0.6););
  background-color:rgba(255, 217, 0, 0.6)
  }
  .fc .fc-view-harness {
  flex-grow: 1;
  position: relative;
  background-color: rgba(255, 214, 0, .9);
  backdrop-filter: blur(2px);
  backdrop-filter: contrast(40%);
  backdrop-filter: drop-shadow(4px 4px 10px blue);
  backdrop-filter: invert(70%);
  backdrop-filter: opacity(20%);
  }
  .fc .fc-toolbar-title {
  font-family: "Work Sans", sans-serif;
  color: rgb(58, 84, 180, 0.8);;
  font-size: 1.25em;
  margin: 0;
  }
  .fc .fc-toolbar-title:after {
  content: 'Lista de Paseos';
  display: block
  }
  .fc .fc-list-event-title a {
    color: inherit;
    text-decoration: none;
}
`

  const StyleWrapper = styled.div`
  .fc-direction-ltr .fc-button-group > .fc-button:not(:first-child) {
  margin-left: -
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background-color: rgb(206, 231, 167);
  color: white;
  }
  .fc-direction-ltr .fc-button-group > .fc-button:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background-color: rgb(206, 231, 167);
  color: white;
  }
  .fc .fc-toolbar-title {
  font-size: 1.10em;
  margin: 0;
  color: black;
  }
  .fc .fc-toolbar-title:after {
  content: 'Chequea si tenes paseos pendientes';
  display: block;
  color: rgb(58, 84, 180, 0.8);;
  }
  .eLsSpQ .fc-direction-ltr .fc-button-group > .fc-button:not(:first-child) {
  margin-left: - border-top-left-radius:0;
  border-bottom-left-radius: 0;
  background-color: rgb(206, 231, 167);
  color: white;
  }
  .fc-timegrid-event-harness-inset .fc-timegrid-event, .fc-timegrid-event.fc-event-mirror, .fc-timegrid-more-link{
  width: 12px;
  height: 12px;
  margin-right: 1px;
  border-radius: 80%;
  display: flex;
  top: 10px;
  font-size: 0em;
  }
  .fc-theme-standard td, .fc-theme-standard th { border: 1px solid var(--fc-border-color, black);
  } 


  .fc .fc-scroller {
  -webkit-overflow-scrolling: touch;

  background-color: gokzuw .fc .fc-button-primary:disabled { border-color: #2C3E50; border-color: var(--fc-button-border-color,rgb(206, 231, 167);); background-color:rgb(206, 231, 167);};
  background-color: rgba(255, 217, 0, 0.7)
  }
  .fc-daygrid-dot-event .fc-event-title {
    flex-grow: 1;
    flex-shrink: 1;
    min-width: 0;
    overflow: visible;
    font-weight: bold;
}
 `

  const ordenespendientes = ordensCliente.filter(
    (ordenes) => 
      ordenes.estadoReserva.toString() === "pendiente" &&
      ordenes.color.toString() === "yellow") 

  return (
    <div className={style.container}>
      <Nav />
      {/* <img className={style.fotoFondo} src={fotoFondo} alt="fotoFondo" /> */}
      <div className={style.containerPerfil}>
        <ReactNotification />
        <div className={style.personalInformation}>
          <div className={style.borderFoto}>
            <div className={style.fotoPerfil}>
              {Walker.image ? (
                <img src={Walker.image} alt="" />
              ) : (
                <img
                  src="https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg"
                  alt=""
                />
              )}
            </div>
          </div>
          <div className={style.informacion}>
            <h2> {Walker.name} {Walker.surname} </h2>
            {Walker.status === "active" ? (
              <p className={style.activo}>Disponible</p>
            ) : ( "" )
            }
            {Walker.status === "inactive" ? (
              <p className={style.noactivo}>No disponible</p>
            ) : ( "" ) 
            }
            <ul>
              <li className={style.liService}>{Walker.service}</li>
              <li className={style.libirth}>{Walker.birth_day}</li>
              <li className={style.liPhone}>{Walker.phone}</li>
              <li className={style.liEmail}>{Walker.email}</li>
              <li className={style.liDni}>{Walker.dni}</li>
              <li className={style.liUbication}>{Walker.ubication}</li>
            </ul>
            <Link to={`/walker/editInformation/${id}`} className={style.editContainerInfo}>
              <button className={style.edit}>Editar Informacion</button>
            </Link>
          </div>
          <div className={style.preferencias}>
            <Preferencias preferencias={preferencias} />
              <Link to={`/walker/editpreferencias/${id}`}>
                <button className={style.edit}>Editar preferencias</button>
              </Link>
          </div>
        </div>
        <div className={style.caracteristicas}>
          {!Walker.premium ? (
            <div className={style.Premuim}>
              <Premium />
            </div>
          ) : ( <div></div>)
          }
          <div className={style.descripcion}>
            <h2>Descripcion:</h2>
              <div className={style.textDescription}>
                {Walker.description ? (
                  <p className={style.textDescriptionNew}>{Walker.description}</p>
                ) : ( <p>Agrega una descripcion</p> )
                }
              </div>
            <Link to={`/walker/editDescription/${id}`} className={style.editContainer}>
              <button className={style.editDescription}>
                <span class="material-icons-outlined">edit</span>
              </button>
            </Link>
          </div>
          <div className={style.price}>
            <h2>Precio por Hora:</h2>
            <div className={style.textDescription}>
              {Walker.price != 0 ? (
                <p>${Walker.price}</p>
              ) : (
                <p>Ponle un precio a tu servicio</p>
              )}
            </div>
            <Link to={`/walker/editPrice/${id}`} className={style.editContainer} >
              <button className={style.editDescription}>
                <span class="material-icons-outlined">edit</span>
              </button>
            </Link>
          </div>
          <div className={style.fotos}>
            <div className={style.fondoFotos}>
              <h2>Fotos</h2>
              <div className={style.galeria}>
                {Walker.images?.map((i) => (
                  <div className={style.containerImg} key={i.public_id}>
                    <button className={style.btnI} onClick={handleOpenImg}>
                      <img src={i.imageURL ? i.imageURL : foto1} alt="a" />
                    </button>
                    <button
                      onClick={() => handleDelete(i.public_id, token)}
                      className="p"
                      className="btn"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
              {Walker.premium === true ?
                <form
                  action={`${baseURL}/postimages/${id}`}
                  method="POST"
                  encType="multipart/form-data"
                  className={style.formImg}
                >
                  <input className={style.inputImg} type="file" name="image" />
                    <button  className={style.subir} type="submit">
                      Subir
                    </button>
                </form> : Walker.images?.length < 3 ?
                <form
                action={`${baseURL}/postimages/${id}`}
                method="POST"
                encType="multipart/form-data"
                className={style.formImg}
              >
                <input className={style.inputImg} type="file" name="image" />
                  <button  className={style.subir} type="submit">
                    Subir
                  </button>
              </form> : <p> maximo tres fotos</p>
              }
            </div>
            <div className={style.btnChat}>
              <Link to={`/messenger`}>
                <button className={style.editchat}> Chat individual </button>
              </Link>
              <Link to={`/chat`} className={style.editContainerChat}>
                <button className={style.editchat}> Chat grupal </button>
              </Link>
      </div>
            <Modal isOpen={isOpen} closeModal={closeModal}   >
            <div >
              <div>
                <span>🟢 Paseos Confirmados</span>
                <span>🟡 Pendientes</span>
              </div>
              <StyleWrapper>
              <FullCalendar
                eventClassNames={style.calendar}
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                  listPlugin,
                ]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek",
                }}
                initialView="timeGridWeek"
                locale={esLocale}
                editable={true}
                selectable={false}
                selectMirror={false}
                dayMaxEvents={true}
                select={handleDateSelect}
                eventClick={handleEventClick}
                contentHeight="auto"
                slotDuration={preferencias.duracion_paseos || "01:00:00"}
                events={ordensCliente}
                slotMinTime={preferencias.comienzo_jornada || "06:00:00"}
                slotMaxTime={preferencias.fin_jornada || "23:00:00"}
                allDaySlot={false}
                weekends={preferencias.dias_trabajo === "LV" ? false : true}
                hiddenDays={
                  preferencias.dias_trabajo === "W" ? [1, 2, 3, 4, 5] : []
                }
                />
              </StyleWrapper>
            </div>
            </Modal>
          </div>
        </div>
        <div className={style.paddingWalker}>
          {ordenespendientes.length > 0 ? <button className={style.answer} onClick={openModal}> Tenes paseos por confirmar!</button> :
            <button className={style.paseos} onClick={openModal}> Ver calendario </button>
          }
          <Agenda>
          <FullCalendar
            className={style.calendario}
            plugins={[listPlugin]}
            initialView="listWeek"
            events={ordensCliente}
            locale={esLocale}
          />
          </Agenda>
          <div className={style.comentariosWalker}>
            <h3>Comentarios:</h3>
            {comment?.length ?(
              comment.map((el) => (
                <div>
                  <p> {el}</p>
                  <hr></hr>
                </div>
              ))): <p>No hay comentarios.</p>}
          </div>
          {/* <img className={style.decoracion} src ={fotosola} alt="fotoFondo" /> */}
        </div>

     

      </div>
      
      {open ? (
        <div className={style.modal}>
          <div className={style.containerImgGrande}>
            <button className={style.closeModal} onClick={handleCloseImg}>
              X
            </button>
            <img src={`${img}`} alt="Imagen" className={style.imagenModal} />
          </div>
        </div>
        ) : ( <div></div> )
      }
    </div>
  );
};
export default PerfilWalker;
