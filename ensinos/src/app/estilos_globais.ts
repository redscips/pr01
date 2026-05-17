'use client';// roda somente no cliente
import { createGlobalStyle, styled } from 'styled-components';
import { InjetaMapasCSS, RetornaValorMapa, cores } from './mapas';

export default createGlobalStyle`
    :root {
        ${InjetaMapasCSS()}
    }
`

export const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
`

export const Titulo = styled.h1`
    color: ${RetornaValorMapa(cores, 'branco')};
    text-align: center;
`