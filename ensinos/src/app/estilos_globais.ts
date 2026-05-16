'use client';// roda somente no cliente
import { createGlobalStyle, styled } from 'styled-components';
import { InjetaMapasCSS, RetornaValorMapa, cores } from './mapas';

export const EstilosGlobais = createGlobalStyle`
    :root {
        ${InjetaMapasCSS()}
    }
`

export const Titulo = styled.h1`
    color: ${RetornaValorMapa(cores, 'branco')};
`