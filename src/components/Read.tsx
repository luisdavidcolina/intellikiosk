import { useContext, useEffect,  } from "react";

import { MenuContext, IItem, PageContext } from "@/data/context";
import { menuList } from "@/data/menu";

const Read = () => {
  const { items, setItems,  } = useContext(MenuContext);
  const { setPage } = useContext(PageContext);
  const addToCart = (item: IItem) => {
    if (item) {
      setItems([...items, item]);
      items.push(item);
      setPage('cart')
    }
  };

  let text = "";

  useEffect(() => {
    const detectedKeyDown = (e: any) => {
      if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9"
      ) {
        text = text + e.key;
      }
      console.log(text);
      if (text.length >= 1) {
        const itemFind = menuList.find((item) =>
          text.includes(item.code)
        ) as IItem;
        if (itemFind) {
          text = "";
          addToCart(itemFind);
        }
      }
    };
    document.addEventListener("keydown", detectedKeyDown);
  }, []);

  return <></>;
};

export default Read;
