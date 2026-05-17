import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { RequisicoesWeb } from '../negocio/RequisicoesWeb';

interface PassosEquacao {
    passos: string[];         //lista com as explicacoes passo a passo da IA
}

export interface EstadoMatematica {
  equacaoDigitada: string;                   //armazena a equacao digitada
  passos: PassosEquacao;
  estaCarregando: boolean;           //indica se a IA esta processando o calculo
  erro: string | null;               //armazena mensagens de erro, caso ocorram

  definirEquacao: (novaEquacao: string) => void; //funcao p/ atualizar a equacao
  resolverEquacao: () => Promise<void>;           //funcao p/ disparar a resolucao
  limparArmazenamento: () => void;               //funcao p/ resetar o aplicativo
}

export const useEstadoMatematica = create<EstadoMatematica>()(
    //ativa o redux devtools p/ usar no navegador
    devtools(
        //ativa persistencia p/ salvar e recuperar os dados do localStorage
        //persist(
            (definir, obter) => ({
                equacaoDigitada : '',
                passos: { passos: [] },
                estaCarregando: false,
                erro: null,

                //atualiza o texto da equacao conforme o usuario digita
                definirEquacao: (novaEquacao) =>
                    definir(
                        { equacaoDigitada: novaEquacao },
                        false,
                        'matematicaEstado/definirEquacao' // nome no devtools
                    ),

                //funcao principal que se comunica com o servidor interno
                resolverEquacao: async () => {
                    try {
                        //obtem a equacao atual do estado
                        const { equacaoDigitada } = obter();
                        //validacao
                        if (!equacaoDigitada.trim()) throw new Error('Por favor, insira uma equação para resolver.');
                        //reseta campos de processamento e ativa a animacao de carregamento
                        definir(
                            { estaCarregando: true, erro: null, passos: { passos: [] } },
                            false,
                            'matematicaEstado/resetandoProcessamento'
                        );
                        // Enviando dados para o servidor salvar ou processar;
                        const dados = await RequisicoesWeb.executaRequisicao<PassosEquacao>(
                            '/api/solucionador', 
                            'POST', 
                            { 
                                equacao: equacaoDigitada, 
                                simplificar: false
                            }
                        );
                        //salva os passos retornados pela API no nosso estado global
                        definir(
                            { passos: { passos: dados.passos }, estaCarregando: false },
                            false,
                            'matematicaEstado/salvarPassos'
                        );
                    } catch (erroCapturado: any) {
                        // Trata o erro e desativa o estado de carregamento
                        definir({ 
                                erro: erroCapturado.message, 
                                estaCarregando: false 
                            },
                            false,
                            'matematicaEstado/definirErro' // nome no devtools
                        );
                    }
                },

                // Reseta todas as informações do aplicativo para o estado inicial
                limparArmazenamento: () =>
                    definir({ 
                            equacaoDigitada: '', 
                            passos: { passos: [] }, 
                            erro: null, 
                            estaCarregando: false 
                        },
                        false,
                        'matematicaEstado/limparArmazenamento' /* nome no devtools */
                    ),
                })//,
            //{
                //name: 'matematicaEstado-armazem'    //chave do estado no localStorage
            //}
        //)
    )
);