import { useEffect, useRef } from 'react';

interface LottieAnimationProps {
  animationData: any;
  width?: number;
  height?: number;
  loop?: boolean;
  autoplay?: boolean;
}

const LottieAnimation = ({ 
  animationData, 
  width = 300, 
  height = 300, 
  loop = true, 
  autoplay = true,
  visible = true
}: LottieAnimationProps & { visible?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;
    let animationItem: any = null;

    const loadLottie = async () => {
      try {
        const lottie = await import('lottie-web');
        if (containerRef.current) {
          animationItem = lottie.default.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop,
            autoplay,
            animationData,
          });
        }
      } catch (error) {
        console.error('Error loading Lottie animation:', error);
      }
    };

    loadLottie();

    return () => {
      if (animationItem) {
        animationItem.destroy();
      }
    };
  }, [animationData, loop, autoplay, visible]);

  return (
    <div 
      ref={containerRef}
      style={{ width, height }}
      className="flex items-center justify-center"
    />
  );
};

export default LottieAnimation;