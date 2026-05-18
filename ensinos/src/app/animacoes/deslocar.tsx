import { Easing, motion, TargetAndTransition, Transition } from 'framer-motion';
import { ReactNode } from 'react';

interface TransicaoProps {
  duration?: number;     //duracao em segundos da animacao
  repeat?: number | typeof Infinity;    //quantidade de vezes que a animacao deve repetir
  ease?: Easing;   //tipo de efeito da animacao
  delay?: number;      //delay p/ começar
}

export interface AnimacaoProps extends TransicaoProps {
  y?: Array<number>;
  x?: Array<number>;
  transition: TransicaoProps;
}

interface DeslocarProps {
  children: ReactNode;
  transicao?: TransicaoProps;
  pairar?: TransicaoProps;
}

export const Deslocar = ({ 
  children,
  transicao = { ease: 'easeOut', delay: 0.3 },
  pairar
}: DeslocarProps) => {
    
  return (
    <motion.div
      style={{
        display: 'inline-block',    //garante que o efeito afete apenas o conteudo e nao o layout
        willChange: "transform",
        backfaceVisibility: "hidden",   //ajuda a evitar que o texto fique 'embacado' durante a animacao
        WebkitFontSmoothing: "antialiased" 
      }}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      whileHover={pairar as TargetAndTransition} 
      transition={transicao as Transition}
    >
      {children}
    </motion.div>
  );
};