// importacoes
import styled from 'styled-components'
import { RetornaValorMapa, cores } from './mapas'

// estilos
export default styled.h1`
    color: ${RetornaValorMapa(cores, 'branco')};
`