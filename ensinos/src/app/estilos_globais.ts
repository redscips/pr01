'use client';
import { createGlobalStyle, styled } from 'styled-components';
import { InjetaMapasCSS, RetornaValorMapa, cores } from './mapas';

export default createGlobalStyle`
    :root {
        ${InjetaMapasCSS()}
    }
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    max-width: 900px;
    margin: 0 auto;
`

export const Titulo = styled.h1`
    color: ${RetornaValorMapa(cores, 'primaria')};
    text-align: center;
    font-size: var(--tamanhos-titulo);
`

// Novos componentes seguindo sua hierarquia
export const SecaoInput = styled.section`
    width: 100%;
    background-color: ${RetornaValorMapa(cores, 'branco')};
    padding: 2rem;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: ${RetornaValorMapa(cores, 'cinza_escuro')};
`

export const EntradaDados = styled.input`
    padding: 1rem;
    border: 2px solid var(--cores-cinza_claro);
    border-radius: 8px;
    font-size: var(--tamanhos-grande);
    font-family: var(--fontes-roboto);
    
    &:focus {
        outline: none;
        border-color: var(--cores-primaria);
    }
`

export const BotaoAcao = styled.button`
    background-color: var(--cores-primaria);
    color: var(--cores-branco);
    padding: 1rem;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    font-size: var(--tamanhos-medio);

    &:disabled {
        background-color: var(--cores-cinza_medio);
        cursor: not-allowed;
    }
`

export const CardPasso = styled.div`
    width: 100%;
    background-color: var(--cores-branco);
    color: var(--cores-cinza_escuro);
    padding: 1.5rem;
    border-left: 6px solid var(--cores-primaria);
    border-radius: 4px 12px 12px 4px;
    margin-bottom: 1rem;
`