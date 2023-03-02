import { printer as ThermalPrinter } from "node-thermal-printer";
import { types as PrinterTypes } from "node-thermal-printer";
import NewPrinter from "printer";

import logger from "@/pages/api/log";
import { IItem } from "@/data/context";

const PRINTER_NAME = `printer1`;
const PRINTER_CHIT_NAME = `kitchen`;

const getTime = () => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

export const print = async (items: IItem[]) => {
  try {
    logger.info(`Initializing printing in "${PRINTER_NAME}"`);
    let printer = new ThermalPrinter({
      type: PrinterTypes.EPSON,
      interface: "",
      width: 48,
      characterSet: "SLOVENIA",
      removeSpecialCharacters: false,
      lineCharacter: "-",
    });
    printer.alignCenter();
    await printer.printImage("public/repsol.png");
    printer.newLine();
    printer.bold(true);
    printer.println("TICKET DE CONSUMO");
    printer.newLine();
    printer.bold(false);
    printer.table([`POS: Kiosk`, `Cuenta: 9999`]);
    printer.table([`Fecha: XXX`, `Hora: ${getTime()}`]);
    printer.newLine();
    printer.underline(true);
    printer.tableCustom([
      // Prints table with custom settings (text, align, width, cols, bold)
      { text: "ARTICULO", align: "LEFT", width: 0.5, bold: true },
      { text: "CANT", align: "CENTER", width: 0.2, bold: true },
      { text: "TOTAL", align: "RIGHT", cols: 8, bold: true },
    ]);
    let total = 0;
    printer.underline(false);

    items.forEach((item: any) => {
      printer.tableCustom([
        // Prints table with custom settings (text, align, width, cols, bold)
        { text: item.menuName, align: "LEFT", width: 0.5 },
        { text: "1", align: "CENTER", width: 0.2 },
        { text: Number(item.price).toFixed(2), align: "RIGHT", cols: 8 },
      ]);
      total += Number(item.price);
    });
    printer.drawLine();
    printer.tableCustom([
      // Prints table with custom settings (text, align, width, cols, bold)
      { text: ` `, align: "LEFT", width: 0.5, bold: true },
      { text: `TOTAL S/`, align: "CENTER", width: 0.2, bold: true },
      { text: Number(total).toFixed(2), align: "RIGHT", cols: 8, bold: true },
    ]);
    printer.newLine();
    printer.printQR("QR CODE");
    printer.newLine();
    printer.underline(false);
    printer.bold(false);
    printer.println("No es un comprobante de pago fiscal");
    printer.newLine();
    printer.println("Gracias por su compra");

    printer.cut();

    NewPrinter.printDirect({
      data: printer.getBuffer(),
      type: "RAW",
      printer: PRINTER_NAME,
      success: function (jobID) {
        logger.info(`Print sent to "${PRINTER_NAME}" - Printer Job: ${jobID}`);
        printer.clear();
      },
      error: function (err) {
        logger.error(JSON.stringify(err));
      },
    });
  } catch (err) {
    console.log(err.message);
    logger.error(JSON.stringify(err.message));
  }
};

export const printChit = async (items: IItem[]) => {
  try {
    logger.info(`Initializing chit printing  in "${PRINTER_CHIT_NAME}"`);
    let printer = new ThermalPrinter({
      type: PrinterTypes.EPSON,
      interface: "",
      width: 48,
      characterSet: "SLOVENIA",
      removeSpecialCharacters: false,
      lineCharacter: "-",
    });
    printer.bold(true);
    printer.alignLeft();
    printer.println("COMANDA");
    printer.alignRight();
    printer.table([``, `Cuenta: 9999`]);
    printer.newLine();
    printer.bold(false);
    printer.table([`Fecha: XXX`, `Hora: ${getTime()}`]);
    printer.drawLine();
    printer.newLine();
    items.forEach((item: IItem) => {
      printer.tableCustom([
        // Prints table with custom settings (text, align, width, cols, bold)
        { text: item.menuName, align: "LEFT", width: 0.5 },
        { text: "1", align: "CENTER", width: 0.2 },
      ]);
      if (item.modifiers !== undefined && item.modifiers.length > 0) {
        item.modifiers.forEach((modifier) => {
          printer.tableCustom([
            // Prints table with custom settings (text, align, width, cols, bold)
            { text: `  ${modifier}`, align: "LEFT", width: 0.5 },
            { text: "1", align: "CENTER", width: 0.2 },
          ]);
        });
      }
    });
    printer.drawLine();
    printer.cut();

    NewPrinter.printDirect({
      data: printer.getBuffer(),
      type: "RAW",
      printer: PRINTER_CHIT_NAME,
      success: function (jobID) {
        logger.info(
          `Print sent to "${PRINTER_CHIT_NAME}" - Printer Job: ${jobID}`
        );
        printer.clear();
      },
      error: function (err) {
        logger.error(JSON.stringify(err));
      },
    });
  } catch (err) {
    console.log(err.message);
    logger.error(JSON.stringify(err.message));
  }
};
