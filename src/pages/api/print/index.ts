import { IItem } from "@/data/context";
import getHandler from "@/pages/api/getHandler";

import { print, printChit } from "./util";

const handler = getHandler();

const consolidateItems = (items: IItem[]) => {
  const newArray: IItem[] = [];
  items.forEach((item) => {
    const index = newArray.findIndex((i) => i.menuName === item.menuName);
    if (index === -1) {
      newArray.push({ ...item, quantity: 1 });
    } else {
      newArray[index].quantity += 1;
    }
  });
  return newArray;
};

handler.post(async (req, res) => {
  const { items } = req.body;
  try {
    await print(consolidateItems(items));
    await printChit(items.filter((item: IItem) => item.type === "foods"));
    res.status(200).json("hola");
  } catch (err) {
    res.status(200).json(4);
  }
});

export default handler;
