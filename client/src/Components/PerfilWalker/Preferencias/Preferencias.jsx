import React from 'react'

function Preferencias({ preferencias }) {
    let inicio = preferencias.comienzo_jornada?.slice(0, -3)
    let final = preferencias.fin_jornada?.slice(0, -3)

    let turno = preferencias.dias_trabajo?.toString()
    let paseos = preferencias.duracion_paseos?.slice(0, -6)
    return (
        <div>
            {
                turno === "LV" ? <p>De Lunes a Viernes</p> :
                    turno === "LD" ? <p>De Lunes a Domingo</p> : <p>Sabados y Domingos</p>
            }
            <p>De {inicio}</p>
            a {final}
            <p>paseos de {paseos} horas</p>
            <p>cantidad de perros por paseo {preferencias.perros_por_paseo}</p>
        </div>
    )
}

export default Preferencias
