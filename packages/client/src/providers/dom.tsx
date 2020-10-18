import { useState, useEffect } from "react";
import { debounce } from "@/utils";

export const scroll = (BaseComponent) => (props) => {
  const [affix, setAffix] = useState(false);
  const [affixVisible, setAffixVisible] = useState(false);

  useEffect(() => {
    let beforeY =
      document.documentElement.scrollTop ||
      window.pageYOffset ||
      window.scrollY ||
      document.body.scrollTop;

    const handler = debounce(() => {
      const y =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        window.scrollY ||
        document.body.scrollTop;
      setAffix(y > 0);
      setAffixVisible(beforeY > y);
      setTimeout(() => {
        beforeY = y;
      }, 0);
    }, 200);

    document.addEventListener("scroll", handler);

    return () => {
      document.removeEventListener("scroll", handler);
    };
  }, []);

  return <BaseComponent {...props} affix={affix} affixVisible={affixVisible} />;
};
