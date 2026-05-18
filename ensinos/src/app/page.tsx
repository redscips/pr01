'use client';

import * as E from "./estilos_globais";
import { useEstadoMatematica } from "./armazens/matematica";
import { Deslocar, AnimacaoProps } from "./animacoes/deslocar";
import Image from "next/image";
import grafico from "./ativos/imagens/grafico.jpg"

export default function Inicial() {

  //acesso ao estado global da matematica
  const { 
    equacaoDigitada, 
    passos, 
    estaCarregando, 
    erro,
    //funcoes p/ atualizar o estado
    resolverEquacao, 
    definirEquacao, 
  } = useEstadoMatematica();

  //cria as animcaoes p/ o titulo
  const animacaoBotao: AnimacaoProps = {
    y: [0, -3, 0], //vai subir 10px e voltar
    transition: {
      duration: 3,
      repeat: Infinity, // Loop infinito
      ease: 'easeInOut',
      delay: 0.5
    },
  };  

  return (
    <E.Container className="">
      <E.Cabecalho className="w-full visu">
        <div className="flex">
          <Image src={grafico} alt="Grafico matemático" width={100} height={100} />
          <E.Titulo className="visu">RESOLUÇÕES</E.Titulo>
          <E.Subtitulo className="visu">MATEMÁTICAS</E.Subtitulo>
        </div>
      </E.Cabecalho>
      <main>
        <E.Formulario
          onSubmit={(e) => {
            e.preventDefault();
            resolverEquacao();
          }}
        >
          <input
            type="text"
            value={equacaoDigitada}
            onChange={(e) => definirEquacao(e.target.value)}
            placeholder="Digite uma equação para resolver"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <Deslocar pairar={animacaoBotao}>
            <button
              type="submit"
              className="w-full bg-primary py-2 rounded hover:bg-primary-dark transition-colors"
              >
              Resolver
            </button>
          </Deslocar>
        </E.Formulario>

        {estaCarregando && <p className="mt-4 text-center">Resolvendo...</p>}
        {erro && <p className="mt-4 text-center text-red-500">{erro}</p>}

        {!estaCarregando && !erro && passos.passos.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Passo a Passo:</h2>
            <ol className="list-decimal list-inside">
              {passos.passos.map((passo, index) => (
                <li key={index} className="mb-1">{passo}</li>
              ))}
            </ol>
          </div>
        )}
      </main>
    </E.Container>
  );
}
