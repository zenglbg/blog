import { useState, useEffect } from "react";

export const scroll = (BaseComponent) => (props) => {
  const [affix, setAffix] = useState(false);
  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setAffix(y > 100);
    };

    document.addEventListener("scroll", handler);

    return () => {
      document.removeEventListener("scroll", handler);
    };
  }, []);

  return <BaseComponent {...props} affix={affix} />;
};
