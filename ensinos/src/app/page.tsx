'use client';

import * as E from "./estilos_globais";
import { useEstadoMatematica } from "./armazens/matematica";
import { Deslocar, AnimacaoProps } from "./animacoes/deslocar";
import { Piscar } from "./animacoes/piscar";

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
  const animacaoTitulo: AnimacaoProps = {
    y: [0, -10, 0], //vai subir 10px e voltar
    transition: {
      duration: 3,
      repeat: Infinity, // Loop infinito
      ease: 'easeInOut',
      delay: 0.5
    },
  };  

  return (
    <E.Container className="visu">
      <E.Cabecalho className="w-full">
        <Deslocar pairar={animacaoTitulo}>
          <E.Titulo className="">Resoluções Matemáticas</E.Titulo>
        </Deslocar>
        <Piscar duracao={2} tipo="easeInOut">
          <p>texto2</p>
        </Piscar>
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
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition-colors"
          >
            Resolver
          </button>
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