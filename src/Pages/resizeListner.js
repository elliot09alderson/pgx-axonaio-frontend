import { useEffect, useState } from "react";
function ResizeListener() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    window.addEventListener("resize", () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      window.removeEventListener("resize", () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      });
    });
  }, []);
  return dimensions;
}
export default ResizeListener;
