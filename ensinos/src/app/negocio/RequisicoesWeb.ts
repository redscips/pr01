export class RequisicoesWeb {
  
  /**
   * Executa uma requisição web (GET ou POST).
   * 
   * @template TipoResposta O formato esperado dos dados que o servidor vai devolver.
   * @param url O endereço da requisição.
   * @param metodo O método HTTP que será utilizado.
   * @param dados Os dados que serão enviados (opcional, usado geralmente no POST).
   * @returns Uma promessa com os dados retornados pelo servidor.
   */
  static async executaRequisicao<TipoResposta>(
    url: string, 
    metodo: 'POST' | 'GET', 
    dados: any = null
  ): Promise<TipoResposta> {

    //cria um configuracao de requisicao
    const configuracao: RequestInit = {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    //CASO: se for POST e tiver dados, converte os dados p/ string no formato json e adiciona ao corpo da requisicao
    if (metodo === 'POST' && dados) configuracao.body = JSON.stringify(dados);
    //executa a requisicao usando fetch e aguarda a resposta
    const resposta = await fetch(url, configuracao);
    //converte a resposta p/ json e aguarda a conversao
    const dadosConvertidos = await resposta.json();
    //CASO: se houve algum erro na requisicao (status diferente de OK), lanca uma exececao com o erro
    if (!resposta.ok) throw new Error(dadosConvertidos.erro || 'Ocorreu um erro ao processar a requisição.');
    //retorna a resposta do servidor
    return dadosConvertidos as TipoResposta;
  }
}