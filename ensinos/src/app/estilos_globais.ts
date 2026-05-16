'use client';// roda somente no cliente
import { createGlobalStyle } from 'styled-components';
import { InjetaMapasCSS } from './mapas';

export const EstilosGlobais = createGlobalStyle`
    :root {
        ${InjetaMapasCSS()}
    }
`