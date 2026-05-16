//mapas: mapa de Fontes
export const fontes = {
  roboto: 'var(--font-roboto), sans-serif',
}

//mapa de cores
export const cores = {
  branco: '#ffffff',
  preto: '#000000',
  cinza_claro: '#f5f5f5',
  cinza_escuro: '#333333',
}

//mapa de tamanhos
export const tamanhos = {
  pequeno: '1rem',
  medio: '1.5rem',
  titulo: '2rem',
}

//funcoes
function UnificaMapas() {
  const estilos: Record<string, string> = {};
  //loop p/ injecoes: fontes
  for (const [chave, valor] of Object.entries(fontes)) {
    estilos[`--fontes-${chave}`] = valor;
  }
  //cores
  for (const [chave, valor] of Object.entries(cores)) {
    estilos[`--cores-${chave}`] = valor;
  }
  //tamanho
  for (const [chave, valor] of Object.entries(tamanhos)) {
    estilos[`--tamanhos-${chave}`] = valor;
  }
  //retorna o objeto de estilos
  return estilos;
}

//converte mapas em uma string CSS
export const InjetaMapasCSS = () => {
  //busca todos os mapas
  const mapas = UnificaMapas();
  //retorna a string CSS
  return Object.entries(mapas)
    .map(([propriedade, valor]) => `${propriedade}: ${valor};`)
    .join("\n");
};

export function RetornaValorMapa<T extends Record<string, string>>(mapa: T, nome: keyof T): string | null {
  return mapa[nome] || null;
}