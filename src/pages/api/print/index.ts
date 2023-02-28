import { IItem } from "@/data/context";
import getHandler from "@/pages/api/getHandler";

import { print, printChit } from "./util";

const handler = getHandler();

handler.post(async (req, res) => {
  const { items } = req.body;
  try {
    await print(items);
    await printChit(items.filter((item: IItem) => item.type === "foods"));
    res.status(200).json("hola");
  } catch (err) {
    res.status(200).json(4);
  }
});

export default handler;
