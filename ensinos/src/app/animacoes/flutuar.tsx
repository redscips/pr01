import { Easing, motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FlutuarProps {
  children: ReactNode;
  tipo?: Easing;   //tipo de efeito da animacao
  distancia?: number;   //quantos pixels ele sobe
  duracao?: number;     //duracao em segundos da animacao
  atraso?: number;      //delay p/ começar
}

export const Flutuar = ({ 
  children,
  tipo = 'easeInOut',
  distancia = 5, 
  duracao = 2, 
  atraso = 0.5 
}: FlutuarProps) => {
    
  return (
    <motion.div
      style={{
        willChange: "transform",
        backfaceVisibility: "hidden",   //ajuda a evitar que o texto fique 'embacado' durante a animacao
        WebkitFontSmoothing: "antialiased" 
      }}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      whileHover={{
        y: [0, -distancia, 0],      //vai de 0 para -distancia e volta para 0
        transition: {
          duration: duracao,
          repeat: Infinity,      // Loop infinito
          ease: tipo,     // Movimento suave
          delay: atraso,
        }
      }} 
      transition={{
        duration: 0.3,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  );
};