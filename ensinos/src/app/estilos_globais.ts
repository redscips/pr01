'use client';
import { createGlobalStyle, styled } from 'styled-components';
import { InjetaMapasCSS, RetornaValorMapa, cores } from './mapas';
import { lighten, darken } from "polished";

//globais
export default createGlobalStyle`
    :root {
        ${InjetaMapasCSS()}
    }
`

//tags
export const Container = styled.div`
    display: flex;
    flex-direction: column;
`

export const Cabecalho = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    padding: 8px;

    background-color: ${RetornaValorMapa(cores, 'primaria')};
`

export const Titulo = styled.h1`
    color: ${RetornaValorMapa(cores, 'branco')};
    background-color: ${darken(0.2, `${RetornaValorMapa(cores, 'primaria')}`)};
    font-size: var(--tamanhos-titulo);

    text-align: center;

    border-radius: 16px;
    padding: 8px;
    margin: 8px;

    /*ajuda a evitar que o texto fique 'embaçado' durante a animacao */
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
`

export const Formulario = styled.form`
    display: flex;
    flex-direction: column;

    margin: 32px 8px;
`