import { NextResponse } from 'next/server';
import { simplify } from 'mathjs';
import { GoogleGenerativeAI } from '@google/generative-ai';

//instancia do Gemini
const geradorIA = new GoogleGenerativeAI(process.env.GEMINI_API_CHAVE || '');

export async function POST(requisicao: Request) {
  try {
    //pega a equacao enviada pelo cliente (ponta-frontal)
    const { equacao, simplificar } = await requisicao.json();
    //valida se a equacao eh valida
    if (!equacao) return NextResponse.json({ erro: 'Digite uma equação válida.' }, { status: 400 });
    //variaveis
    let equacaoParaResolver = '';
    let dicaParaIA = '';
    //1) resolve a equacao com 'mathjs'
    try {
        //valida simplificar expressao
        if (simplificar)
          equacaoParaResolver = simplify(equacao).toString();
        else
          equacaoParaResolver = equacao;
        //validacao p/ forcar uma simplificacao, pois p/ o mathjs resolver, eh preciso que a expressao esteja igualada a 0
        if (equacaoParaResolver.includes('=')) {
          //pega os dois lados da equacao
          const [ladoEsquerdo, ladoDireito] = equacaoParaResolver.split('=');
          //cria uma nova expressao que subtrai os dois lados, forcando o mathjs a simplificar e isolar a variavel
          const expressaoParaResolver = `(${ladoEsquerdo}) - (${ladoDireito})`;
          //simplifica
          equacaoParaResolver = simplify(expressaoParaResolver).toString();
        }
        //tentativa de calculo direto p/ garantir a precisao
        //const resultadoCalculado = evaluate(equacaoParaResolver);
        //-----
        //dicaParaIA = `O resultado exato é: ${resultadoCalculado}. Use isso na sua explicação.`;
    } catch (erro) {
      equacaoParaResolver = equacao;
      dicaParaIA = "Esta é uma equação algébrica que exige isolar a incógnita. Resolva passo a passo com precisão.";
    }
    //2) ensinando passo a passo: a didatica da IA geminiks
    const modelo = geradorIA.getGenerativeModel({ model: "gemini-3-flash-preview" });
    //prompt
    const comando = `
      Você é um professor de matemática experiente. 
      Tarefa: Resolver a equação "${equacaoParaResolver}".
      ${dicaParaIA ? `Contexto importante: ${dicaParaIA}` : ''}
      
      Regras de resposta:
      1. Divida a explicação em passos lógicos e curtos.
      2. Use o caractere "|" estritamente para separar cada passo.
      3. Se for uma equação de 2º grau, aplique a fórmula de Bhaskara.
      4. Não adicione saudações, apenas os passos da resolução.
    `;
    //executa pergunta a IA
    const resultadoIA = await modelo.generateContent(comando);
    const respostaTexto = resultadoIA.response.text();
    //transforma a resposta em uma lista (array), pois pedimos a IA p/ separar os passos com '|'
    const listaDePassos = respostaTexto
      .split('|')
      .map(passo => passo.trim())
      .filter(passo => passo.length > 2);
    //retorna o passo a passo
    return NextResponse.json({ passos: listaDePassos });
  } catch (erro: any) {
    // ESSENCIAL: Imprima o erro real no seu terminal para sabermos o motivo exato
    console.error("ERRO DETALHADO NO SERVIDOR:", erro);
    return NextResponse.json(
      { erro: 'Infelizmente não conseguimos processar esse cálculo agora.' }, 
      { status: 500 }
    );
  }
}