import { Easing, motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PiscarProps {
  children: ReactNode;
  tipo?: Easing;   //tipo de efeito da animacao
  duracao?: number;     //duracao em segundos da animacao
  atraso?: number;      //delay p/ começar
}

export const Piscar = ({ 
  children,
  tipo = 'easeInOut',
  duracao = 2, 
  atraso = 0 
}: PiscarProps) => {
    
  return (
    <motion.div
        style={{ willChange: "transform", backfaceVisibility: "hidden", WebkitFontSmoothing: "antialiased" }} //ajuda a evitar que o texto fique 'embacado' durante a animacao
        animate={{
            opacity: [1, 0.5, 1],   //vai de opacidade 1 para 0.5 e volta para 1
        }} 
        transition={{
            duration: duracao,
            repeat: Infinity,      // Loop infinito
            ease: tipo,     // Movimento suave
            delay: atraso,
        }}
    >
      {children}
    </motion.div>
  );
};