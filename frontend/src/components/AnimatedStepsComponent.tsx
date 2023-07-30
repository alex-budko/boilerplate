import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';

const steps = [
  "Sign in through GitHub",
  "Input prompt into code generator",
  "A repo will be automatically generated with the necessary code",
];

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AnimatedStepsComponent = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,  
    threshold: 0.1,  
  });

  return (
    <div style={{ marginTop: '50px' }} ref={ref}>
      {steps.map((step, i) => (
        <motion.div
          key={i}
          variants={variants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"} 
          transition={{ delay: i * 0.5 }}
          style={{ margin: '20px', fontSize: '20px', color: 'white' }}
        >
          {step}
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedStepsComponent;
