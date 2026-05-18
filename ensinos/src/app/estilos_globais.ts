'use client';
import { createGlobalStyle, styled, css } from 'styled-components';
import { InjetaMapasCSS, RetornaValorMapa, cores, tamanhos } from './mapas';
import { lighten, darken } from "polished";

//globais
export default createGlobalStyle`
    :root {
        ${InjetaMapasCSS()}
    }
`

//mixins
const Centraliza = (direcao: string = 'row') => css`
    display: flex;
    flex-direction: ${direcao};
    justify-content: center;
`

//tags
export const Container = styled.div`
    display: flex;
    flex-direction: column;
`

export const Cabecalho = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 16px 40px;

    img {
        border-radius: 30%;
        box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.3);

        border: 1px solid rgba(0, 0, 0, 0.5);
    }
`

export const Titulo = styled.h1`
    font-size: ${RetornaValorMapa(tamanhos, "extra_grande")};
    font-weight: bold;
    margin-left: 12px;

    padding-top: 16px;

    border-bottom: 1px dashed ${RetornaValorMapa(cores, "azul")};

    color: ${RetornaValorMapa(cores, "azul")};
`

export const Subtitulo = styled.h3`
    //usa mixin
    ${Centraliza('column')}
    
    font-size: ${RetornaValorMapa(tamanhos, "titulo")};
    font-weight: bold;
    margin-left: 12px;

    border-bottom: 1px dotted ${RetornaValorMapa(cores, "azul_escuro")};

    color: ${RetornaValorMapa(cores, "azul_escuro")};
`

export const Formulario = styled.form`
    
`;