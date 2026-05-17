'use client';

import * as E from "./estilos_globais";
import { useEstadoMatematica } from "./armazens/matematica";

export default function Inicial() {
  const { 
    equacaoDigitada, 
    definirEquacao, 
    resolverEquacao, 
    passos, 
    estaCarregando, 
    erro 
  } = useEstadoMatematica();

  return (
    <E.Container className="visu">
      <E.Titulo className="visu">Mestre da Matemática IA</E.Titulo>
      
      <E.SecaoInput className="visu">
        <label>Qual desafio vamos resolver hoje?</label>
        <E.EntradaDados 
          className="visu"
          placeholder="Ex: 2x + 5 = 15"
          value={equacaoDigitada}
          onChange={(e) => definirEquacao(e.target.value)}
        />
        
        <E.BotaoAcao 
          className="visu"
          onClick={() => resolverEquacao()}
          disabled={estaCarregando}
        >
          {estaCarregando ? "Pensando..." : "Resolver Passo a Passo"}
        </E.BotaoAcao>

        {erro && <p style={{ color: 'var(--cores-erro)' }}>{erro}</p>}
      </E.SecaoInput>

      <div className="visu">
        {passos.passos?.map((passo, index) => (
          <E.CardPasso key={index} className="visu">
            <h3>Passo {index + 1}</h3>
            <p>{passo}</p>
          </E.CardPasso>
        ))}
      </div>
    </E.Container>
  );
}