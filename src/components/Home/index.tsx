import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { PageContext, MenuContext, IItem } from "@/data/context";
import { menuTabItems, menuList } from "@/data/menu";

import Advertise from "../Advertise";

const HeaderArea = styled.div`
  height: 7vh;
`;

const HomeButton = ({ num = 0, src = "", text = "" }: any) => {
  return (
    <div className="flex flex-col items-center justify-center  p-20">
      <div className="indicator">
        <span className="indicator-item badge indicator-start h-14 w-14 text-xl">
          {num}
        </span>
        <button className=" rounded-2xl btn btn-lg btn-primary btn-square h-40 w-40  text-white">
          <img className="h-28 w-28" src={src} />
        </button>
      </div>
      <div className="text-xl text-center font-bold " style={{width: "120px"}}> {text}</div>
    </div>
  );
};

const HomePage = () => {
  const { setPage } = useContext(PageContext);
  const { orderId, setOrderId } = useContext(MenuContext);
  const handleClick = (e: any) => {
    e.preventDefault();
    orderId ? setOrderId(orderId + 1) : setOrderId(1);
    setPage("order");
  };

  const { items, setItems } = useContext(MenuContext);

  const addToCart = (item: IItem) => {
    if (item) {
      setItems([...items, item]);
      items.push(item);
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
      if (text.length >= 13) {
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
  }, [addToCart]);

  return (
    <>
      <HeaderArea>
        <Advertise />
      </HeaderArea>
      <div className="flex flex-col h-full items-center justify-center">
        <h2 className="text-4xl font-bold">¿DUDAS?</h2>
        <p className="text-3xl font-bold">Compra en 4 sencillos pasos</p>
        <div className="pt-20 grid grid-cols-2 gap-2">
          <HomeButton
            num={1}
            text="Selecciona tus productos"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADQklEQVR4nO2a229NQRSHt9TlgVRcUhQhFRpEFFGhT/wR3v0hfSLEJWmliTQeJOJBaaQPhAgSwYNLaUPVJR4EbRNV6pK4tflkHb9T2+nep/vsPbtnu/ySnZyZzl5rvs7MOmtmjuf9118oYC3QBPQAn/TY58PAGi/rAqYDLcAI4RoV0AwvwxCX1NnPQDNQD8zUUy+AL2pzMQ4McBToBBanBWIjYXoBrCvSbj3wUm2bY/g5r3efANWJOx6wJkY0EjkIYAnQDnzQcwZYqb/VAV81zVaX6GsOcFcwj4FFLkFsYZuafBBDAetjKD8lfCMYZ1TmAl16/xGw0BXIQxndrLKNhOmsdVzPOdWdUputKt+P6XMe0C0b5n+BCxCbOqZZBeWxBQksVd2wypW4VQ9QlRTkrYxVqpxTQLuxemC2Y5AHLkAsHJq2lACyTcVOR1OrKhGEjB6SwZYSQI6oeDAmRJfe73WyPmS4RuH3G7BhIhBgE/Bd7WtiRKx7ziOWz8E+Ge+PADKQYDRu+L4Q3X2H+BxUKNyOKaCNX9a2Ioafbq0Jt9/qATC7I4DsBaZ6WRcRFvsfIf4VEOAYMKjc66TlZl4WRbTF7lcfsBE4rqg3KMCa8hAUdDisPiSZDNIAsDzLIEHJZBjgBcuYgTeF+5qyg8QADN3XZBIkrJ4i+5pUVaRjt4A7AfU3gdthdiiyr4nTuVrt/Pr12OfaUkBi+MzJmX1BvGO8hvN7ECeOxtu5DlxzZt+3B7ejmGrN1Y4wGFcgYUoCkk/NxzJOS/qAtiCYLIP06d3fQl4YTJZBTuvdjsL0OwgmyyCrfIu9LQJMNkFMSuryp4ftATC2qTrhD2leSiKpfU2b4YgjM+qi00Fy8o+KCGPHQ3sSOSreh5xcGCo6zdIWkitjZYPBJUg5YXANUg4Yfp3iv0/DeNEA4NhXnfz0puVgUmCARvloTcN+GMy0FKbVa9nf4dL2RDBXgfmO7E7xbSeuuLAZNQDkr6BfAbviHFgXjEQewk5TVniTJbu3sN1dPlQCz4ADNiWAZRP9WMDuI/l519Lom04G0TBpEAXTYSfwlOS6nIWTR8uMG4D9uqh57vspR5g+6h6kFdheVoD/8pLrByGIy5kBEzpaAAAAAElFTkSuQmCC"
          />
          <HomeButton
            num={2}
            text="Escanea los códigos"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEYElEQVR4nO2bXYhVVRTH99SUo+nkJ4hUzkRkoZWaGWZgTuBXpJn55INh4IuQFKHRp/rgpBSB1UMf4kOCYBAiJT2YRh8UkYVCpqiQmhCMidLLZB+/2HP/u7s4nXs8d87Y3DPtP2y453/22mvtdfdeZ++z13EuIiKirABuBW7JuN8GzAXu6GvFTcDVOeu29KnyarvjgYsqNyTuNQOvAn9SxR5gTFGlzcBLwAUp/gAYl1F/mYzYUkhxettjgF+As8DoxL3nSMeeokqfTmn084z6G1RnbyHFtdsf5kuCuwI4L71fAHcBbxt7byui8JAaOQi8axptr1F/ELCk8NCrz8ZWY9cT4qYbbl5fOWC7abTNNRCAH2XXT94JwJe69tPx+jwNtAAjU/i1KVPgs8vQgVT9dcg/UiMGvJJH+ErgKNANTE4Jghs1x3wQ3J0VBHtpvNU/paATwkg4Bzzj7c8jeBXQJcFZRR+DvTD8kvp7EROa6hW6Dpjq+gn9rT8iZbi3A3eWrLTVPfQtgKHAi8BpyotTwAvANa4eADcCPzBw8H2txdq/AFwLHDHC+4DlwMwGGNZ5i7f1UeAT0w//h7bmccAmI/SsKzk0BQI2Xqpys3ZYHh+6AQLgI/XpbOZiCJhqvPWQ2dCMUGkyS9UezsgOFjfccEPEtSaC6wi7i9OuznNDEwsYzw0x3HBxgw0XbGsxT63ADRL3sOnX5CwHLDAVJ4pbYbiefTewJhApU6fLcFvFHTHcruQ22v8Wt8twIQ5tNVxYIW4yXMAaXY823GPiJhluQZYDFpmKEwaQAyYYblF0QC0QRwBxChBjwD+IQdDFp4CLj0HiOoC4EKKKuBJ0cSns4l6AuBki7gYRzEYqboepIL4PcNVREV+IUEF8I+SqoyK+EqOC+E7Q/Q9eik4DltrEJB1beW624WaLm2m4eeKmlcUB85VD+Ly7TPBtS8f8hnNAf6GhHEBFuR+2NxvOH609oHZuN0dmbwHHga+AexLtdAILzVGXT8s74ZOnGtYBwIPKy/N40vB7gd+BX5WnN0OdWqe578/ut5v6K9XGKl23S87HhPsbxQFjw1m8kX0KeC3FAZOU2Owd5LHM3HtdJ7b36dqntf4sp6wyB5sXdb7fmWJzyAkY+585oBZ0ypt0gD813qy8v20+Dc7cW6Lh/bLqnVSd74B3fGqLgmunEq//ShsFCRsKOaDDVOz5dzVMd6oMy5C9CXhcsjtDjh/wvrj3NLzvVh7CemAx8LXO70cC36h0yxnjgDnKVQoOmJXjTwj2dpjHcUBHlvB4U3F1lqIU2aXKyAxlizK3uxK8n/ujgB3AMWB/MiNUIyD8e/cq69vX3VCPTaY9ny8ckJ0rTEU5yg4b5UoOTYkz6tOBPAKLjbcOhFhQRvjPaYBvTX8W5hV8wwj9AXyq4PRmSco22extD8j/1QqV57TPrvqN8qNbn9DUnzVKZRHig9bHwGGtxspQDsvmdY32MUdEREREhGsg/A1qBDKeYtVTPgAAAABJRU5ErkJggg=="
          />
          <HomeButton
            num={3}
            text="Embolsa tu compra"
            src="data:image/png;base64,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"
          />
          <HomeButton
            num={4}
            text="Paga con tarjeta"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADTElEQVR4nO3YW6imUxjA8ZeZPTkNihxSkiE3KIQpbiYuNNyQQ9EYc2MojENuxAVTKFzgwuHCIROlCTnkECY1IaecL8YhI2McRw45DPZPj/18Wr17f3v2933vt/en3n/t9veud63n8K5nrfU8q6paWlpaWlpamgHbYyXewR+Gz1Z8gMswv0lH7jd3PNmXM1iIW/AJPsOLKfAXnItdGvtCXQgdWIGfU/cVvQo4FBu6fJkLqlkGy1P3h70MOh5bcuDbOAL74q9sWzhUq6cAO6XuP2fSebuYulxgwRMhoHg/ElTbcGKPNDwYx631hWVEqKZx4hh8mv1+xJld+o0EVZdQWlWE0us4cBqHR4KqZlQs3ueKULoZY9sIv8mCZhF1/TgF32T7t/Hcl6BZRkc/dsDtOQPBszEzPQuavs88LMFtGarv4x4c3KQjb+Xv33BprJG+BE39bixP4G6HaMz8oqYc2ZwH3GEDCZqcxkRCt7EwOlKa67A4ZgKPZvuaphwZi+x1YEETv/fB9UUGILPUZVOcPwfl+y2NODIohcF34/fi+SWc3C1UsXv229qE/mpAIUfXYv5vrMWxMxgbmXLw7pw5YuLQfLxw4FfcEeEyw/GL8EWOvaQvIxpyZD6+wvdYjb16GHscNqX+Vwat8AwaWtgZC3rov39Wkp3z6jXs2bcB1X8f9N+QHkTOTJUdiXuL3C3+34AdG5C9OGVubMbaqZWchDeLdRQF2Boc0oDsebGh5NYe3NSM1ZMVnVHMwLB5D7sOw4lzovQcsvHj+DwvQXYbhhMr8ywJrsV5+fuhWr/YqoOLa4VcsKGa4wu6q4odaXW2X53PN9b6P5XtS4u2y7Nt7Vw4ECXA6Xg1jYjZWFW8fzDbL6yNW5/tJxTbaMR6sGJQg/bOrPQonIjTMgWPsvea2BlwFx7G03k9Wl8L61LegkweOyyr6Xu+Y3TqvTOfN/W9LeNl/RP3vOvS2bhpDL7ET7V+D2RaE38XFSGoluYsGWQ21qdBUeZ+jDfwAh7BfXkFFGnIlTgfZ2VZfHjMZCHnbHyXRo3nGbK8cHBzXrF23j+Dr/EDHgt51aiQB9UBkaIXbUvzA3X4CKdW/1dMFF37DVLEtbS0tLS0tFTT8w9pB5USgLfyLgAAAABJRU5ErkJggg=="
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
