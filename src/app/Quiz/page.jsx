"use client";
import { useState, useEffect, useRef } from "react";
import localFont from "next/font/local";

const fontSerif = localFont({ src: "../../fonts/NotoSerifTangut.ttf" });
const fontSageffine = localFont({ src: "../../fonts/Sageffine.otf" });

const trivia = {
  totalPreguntas: 5,
  preguntas: [
    {
      id: 1,
      pregunta: "¿Cuál es la capital de Francia?",
      respuestas: ["Madrid", "Berlín", "París", "Londres"],
      respuestaCorrecta: "París",
    },
    {
      id: 2,
      pregunta: "¿Cuál es la fruta que contiene potasio?",
      respuestas: ["Frutilla", "Naranja", "Banana", "Manzana"],
      respuestaCorrecta: "Banana",
    },
    {
      id: 3,
      pregunta: "¿Cuál es el resultado de 2 + 2?",
      respuestas: ["3", "4", "5", "6"],
      respuestaCorrecta: "4",
    },
    {
      id: 4,
      pregunta: "¿Quién escribió 'Don Quijote de la Mancha'?",
      respuestas: [
        "Miguel de Cervantes",
        "Gabriel García Márquez",
        "William Shakespeare",
        "Leo Tolstoy",
      ],
      respuestaCorrecta: "Miguel de Cervantes",
    },
    {
      id: 5,
      pregunta: "¿Cuál es el mejor vino Argentino?",
      respuestas: ["Filipino", "Tauren", "Cosecha Temprana", "Malbec"],
      respuestaCorrecta: "Malbec",
    },
  ],
};

const Quiz = () => {
  const [preguntaActiva, setPreguntaActiva] = useState(0);

  const [checked, setChecked] = useState(false);

  const [respuestaSeleccionadaIndex, setRespuestaSeleccionadaIndex] =
    useState(null);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState("");

  const [resultado, setResultado] = useState({
    puntaje: 0,
    respuestasCorrectas: 0,
    respuestasIncorrectas: 0,
  });

  const [mostrarResultado, setMostrarResultado] = useState(false);

  const { preguntas } = trivia;
  const { pregunta, respuestas, respuestaCorrecta } = preguntas[preguntaActiva];
  const chartRef = useRef(null); // Referencia al gráfico

  //   Respuesta seleccionada y checkeada
  const onRespuestaSeleccionada = (respuesta, idx) => {
    setChecked(true);
    setRespuestaSeleccionadaIndex(idx);
    if (respuesta === respuestaCorrecta) {
      setRespuestaSeleccionada(true);
      //   console.log("true");
    } else {
      setRespuestaSeleccionada(false);
      //   console.log("false");
    }
  };

  //   Calcula el puntaje y cambia a la siguiente pregunta
  const siguientePregunta = () => {
    setRespuestaSeleccionadaIndex(null);
    setResultado(
      (
        prev // Define prev en 0 cada vez que se use
      ) =>
        respuestaSeleccionada
          ? {
              ...prev, // Setea prev con los datos previos de resultado
              puntaje: prev.puntaje + 5,
              respuestasCorrectas: prev.respuestasCorrectas + 1,
            }
          : {
              ...prev,
              respuestasIncorrectas: prev.respuestasIncorrectas + 1,
            }
    );
    if (preguntaActiva !== preguntas.length - 1) {
      setPreguntaActiva((prev) => prev + 1);
    } else {
      setPreguntaActiva(0);
      setMostrarResultado(true);
    }
    setChecked(false);
  };
  return (
    <div className="bg-[url('../views/img/bg_uvas_rojo.jpg')] justify-center items-center min-h-screen p-5 ">
      <div className={`bg-rojoClaro ${fontSageffine.className}`}>
        <div className="absolute top-0 right-0 m-7 text-4xl">
          Trivia{" "}
          <span className="bg-white text-red-900 rounded-md p-2">Malbec</span>
        </div>
      </div>
      <div>
        <div className="">
          {!mostrarResultado ? (
            <div className="w-[100%] md:w-[70%] lg:w-[50%] text-white mt-14 mx-auto p-5">
              {/* <h2 className="font-bold text-2xl">
                Preguntas: {preguntaActiva + 1}{" "}
                <span>/ {preguntas.length}</span>
              </h2> */}
              <div className={fontSerif.className}>
                <h2 className="w-fit bg-white text-red-900 rounded-full font-bold text-xl py-2 px-10 my-2">
                  {preguntaActiva + 1}
                  {"º Pregunta"}
                </h2>
              </div>
              <div className="w-[80%] md:w-[70%] lg:w-[80%]">
                <div className={fontSageffine.className}>
                  <h3 className="text-white text-4xl md:text-5xl lg:text-7xl p-3">
                    {preguntas[preguntaActiva].pregunta}
                  </h3>
                </div>
              </div>
              <div className={fontSerif.className}>
                {respuestas.map((respuesta, idx) => (
                  <li
                    key={idx}
                    onClick={() => onRespuestaSeleccionada(respuesta, idx)}
                    className={
                      respuestaSeleccionadaIndex === idx
                        ? "li-selected"
                        : "li-hover"
                    }
                  >
                    <span>{respuesta}</span>
                  </li>
                ))}
                {checked ? (
                  <div className="w-full">
                    <button
                      onClick={siguientePregunta}
                      className="btn shadow-glow"
                    >
                      {preguntaActiva === pregunta.length - 1
                        ? "Finalizar"
                        : "Siguiente"}
                    </button>
                  </div>
                ) : (
                  <div className="w-full">
                    <button
                      onClick={siguientePregunta}
                      disabled
                      className="btn-disabled shadow-glow"
                    >
                      {" "}
                      {preguntaActiva === pregunta.length - 1
                        ? "Finalizar"
                        : "Siguiente"}
                    </button>
                  </div>
                )}
              </div>
              <div className={fontSageffine.className}>
                <div className="text-center">
                  <span className="text-4xl">
                    Seleccione su respuesta<br></br>pulsando el cuadrado
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-[100%] md:w-[70%] lg:w-[35%] backdrop-blur-sm bg-white/[.06] text-white p-5 text-xl border border-white rounded-lg mt-20 mx-auto">
              <div className={fontSerif.className}>
                <h3 className="text-2xl font-bold pl-2">Resultados:</h3>
                <p className="p-2">
                  Respuestas Correctas:{" "}
                  <span className="text-green-500">
                    {resultado.respuestasCorrectas}
                  </span>
                </p>
                <p className="p-2">
                  Respuestas Incorrectas:{" "}
                  <span className="text-red-500">
                    {resultado.respuestasIncorrectas}
                  </span>
                </p>
                <h3 className="p-2">
                  Nota:{" "}
                  <span className="text-sky-400">
                    {(resultado.puntaje / 25) * 100}/100
                  </span>
                </h3>
                {/* <p className="p-2">
                  Preguntas:{" "}
                  <span className="text-sky-400">{preguntas.length}</span>
                </p> */}
                <p className="p-2">
                  Puntaje:{" "}
                  <span className="text-sky-400">{resultado.puntaje}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
