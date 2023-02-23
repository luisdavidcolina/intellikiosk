const menuTabItems = [
  { type: "foods", title: "Comidas", itemLength: 12 },
  { type: "snack", title: "Snacks", itemLength: 12 },
  { type: "licor", title: "Galletas", itemLength: 12 },
  { type: "drink", title: "Bebidas", itemLength: 12 },
  { type: "alcoholicas", title: "Licor", itemLength: 12 },
  { type: "cigarrillos", title: "Cigarrillos", itemLength: 12 },
];

const menuList = [
  {
    code: "123412341234",
    type: "foods",
    menuName: "Enrrollado Árabe",
    menuInfo: "Enrrollado Árabe Vegetariano El Cedro 200gr",
    price: "6.9",
  },
  {
    code: "123412341236",
    type: "foods",
    menuName: "Hot Dog XL Alemán",
    menuInfo:
      "Hot Dog Municipal XL con sarza alemana, salsa BBQ y papitas al hilo.",
    price: "26.9",
  },
  {
    code: "123412341235",
    type: "foods",
    menuName: "Burger BBQ",
    menuInfo:
      "Burger 130gr con Queso Emmental, Tocino, salsa BBQ black, Onion Ring, Lechuga y Tomate.",
    price: "20.9",
  },
  {
    code: "7750526000895",
    type: "snack",
    menuName: "Papas Inka Chips Salada 142gr",

    price: "9.50",
  },
  {
    code: "775874004919",
    type: "snack",
    menuName: "Papas Fritas Lay's Clasicas 38g ",

    price: "3.8",
  },
  {
    code: "7758574004445",
    type: "snack",
    menuName: "Nacho Dorito Clasico 45g",
    price: "8.5",
  },
  {
    code: "7758574004230",
    type: "snack",
    menuName: "Piqueo Snax Frito Lay 225gr",

    price: "5",
  },

  {
    code: "03800084673",
    type: "snack",
    menuName: "Papa Pringles Original 37gr",

    price: "2.9",
  },
  {
    code: "7501006559002",
    type: "snack",
    menuName: "Pop Corn Natural Act Li 80 g",

    price: "4.5",
  },
  {
    code: "7750106003094",
    type: "licor",
    menuName: "Soda San Jorge ",

    price: "0.8",
  },
  {
    code: "7622201700973",
    type: "licor",
    menuName: "Galletas Ritz",

    price: "2.1",
  },
  {
    code: "7750168002240",
    type: "licor",
    menuName: "Galletas Oreo 4g",

    price: "1.2",
  },
  {
    code: "7622300279783",
    type: "licor",
    menuName: "Galleta Sabor Vainilla Field Paquete",
    price: "1.4",
  },
  {
    code: "7750168214292",
    type: "licor",
    menuName: "Galletas con Chispas de chocolate",
    price: "8.9",
  },
  {
    code: "7750182006088",
    type: "licor",
    menuName: "Galleta Sabor Vainilla Field",
    price: "1.4",
  },
  {
    code: "7750182003322",
    type: "drink",
    menuName: "Gaseosa Inca Cola 500ml",

    price: "3.2",
  },
  {
    code: "7751655001333",
    type: "drink",
    menuName: "Gateorade Maradona 500ml",
    price: "3.5",
  },
  {
    code: "77530967",
    type: "drink",
    menuName: "Agua San Mateo con gas 600ml",
    price: "2",
  },
  {
    code: "7750182000697",
    type: "drink",
    menuName: "Gaseosa Coca Cola Sin azucar 500m",
    price: "3.2",
  },
];

const menuModifiers = ["Con Ketchup", "Con Mostaza", "Con Mayonesa"];

const extraPriceMap = {
  setPrice: 2000,
  largeSetPrice: 2700,
};

export { menuTabItems, menuList, extraPriceMap, menuModifiers };
/*
const menuTabItems = [
  {type: 'special', title: 'special', itemLength: 6},
  {type: 'premium', title: 'premium', itemLength: 12},
  {type: 'whopper', title: 'whopper', itemLength: 6},
  {type: 'burger', title: 'Junior & Burger', itemLength: 12},
  {type: 'chicken', title: 'Chicken Burger', itemLength: 6},
  {type: 'sidemenu', title: 'side', itemLength: 12},
  {type: 'drink', title: 'Drink & Dessert', itemLength: 12},
];

const menuList = [
  {type: 'combo', menuName: 'Combo 1 - Burrito Supreme', menuInfo: 'Burrito supreme, complemento regular y gaseosa 400 ml. a elección', price: '17.90'},
  {type: 'combo', menuName: 'Combo 2 - Quesadilla de Pollo', menuInfo: 'Quesadilla de pollo, complemento regular, side a elección y gaseosa 400 ml a elección .', price: '18.90'},
  {type: 'combo', menuName: 'Combo 3 - 2 Tacos Supreme', menuInfo: '2 crunchy tacos supreme, porción de nachos o papas y gaseosa de 400 ml a elección.', price: '19.90'},
  {type: 'box', menuName: 'Big Bell Box', menuInfo: 'Taco, burrito supreme, quesadilla de queso, porción nachos regular y gaseosa 400 ml a elección.', price: '27.90'},
  {type: 'box', menuName: 'Box Stacker', menuInfo: 'Taco, stacker (carne molida), cheesy beef burrito, complemento regular y gaseosa 400 ml a elección.', price: '27.90'},
  {type: 'box', menuName: 'Box Chalupa', menuInfo: 'Quesadilla de queso, 2 chalupas, porción nachos o papas regular, postre y gaseosa 400 ml a elección.', price: '29.90'},
  {type: 'dessert', menuName: 'Flauta Manjar Blanco', menuInfo: 'Flauta de tortilla de harina rellena de manjar blanco', price: '3.00'},
  {type: 'dessert', menuName: 'Flauta Chocolate', menuInfo: 'Flauta de tortilla de harina rellena de chocolate', price: '3.00'},
  {type: 'dessert', menuName: 'Cinnamon Twist', menuInfo: 'Rollitos de canela cubiertos de azúcar', price: '3.00'},
  {type: 'drink2', menuName: '', menuInfo: '', price: ''},
  {type: 'drink2', menuName: '', menuInfo: '', price: ''},
  {type: 'drink2', menuName: '', menuInfo: '', price: ''},
  {type: 'special', menuName: 'Monster Ⅱ Pack 1', menuInfo: 'Monster Ⅱ Whole Shrimp + Monster Ⅱ + French Fries L + Nugget King 4 Pieces + Coke R2', price: '22700'},
  {type: 'special', menuName: 'Monster Ⅱ Pack 2', menuInfo: 'Monster Ⅱ + Monster Whopper + French Fries L + Nugget King 4 Pieces + Coke R2', price: '21600'},
  {type: 'special', menuName: 'Monster Ⅱ Pack 3', menuInfo: 'Monster Ⅱ Whole Shrimp + Quattro Cheese Whopper + French Fries L + Nugget King 4 Pieces + Coke R2', price: '21600'},
  {type: 'special', menuName: 'Crunchy King & Nugget King 10', price: '16000'},
  {type: 'special', menuName: 'Crunchy & Mozzar Ball 10', price: '15900'},
  {type: 'premium', menuName: 'Quatro Cheese Whopper', price: '7800'},
  {type: 'premium', menuName: 'Monster X', price: '10400'},
  {type: 'premium', menuName: 'Whole shrimp X', price: '8800'},
  {type: 'premium', menuName: 'Quatro Cheese X', price: '8800'},
  {type: 'premium', menuName: 'Guinness Quattro Cheese Whopper', price: '9400'},
  {type: 'premium', menuName: 'Guinness Mushroom Whopper', price: '9800'},
  {type: 'premium', menuName: 'Guinness Whopper', price: '9400'},
  {type: 'premium', menuName: 'Monster Whopper', price: '9400'},
  {type: 'premium', menuName: 'Whole Shrimp Whopper', price: '7800'},
  {type: 'whopper', menuName: 'Stacker 2 Whopper', price: '9600'},
  {type: 'whopper', menuName: 'Stacker 3 Whopper', price: '11600'},
  {type: 'whopper', menuName: 'Stacker 4 Whopper', price: '13600'},
  {type: 'whopper', menuName: 'Real Whopper', price: '7000'},
  {type: 'whopper', menuName: 'Cheese Whopper', price: '7600'},
  {type: 'whopper', menuName: 'Bacon Cheese Whopper', price: '8800'},
  {type: 'burger', menuName: 'Baby Shark Shrimp Burger', price: '4800'},
  {type: 'burger', menuName: 'Mom Shark Shrimp Burger', price: '5800'},
  {type: 'burger', menuName: 'Daddy Shark Shrimp Burger', price: '6800'},
  {type: 'burger', menuName: 'Gochujang Bulgogi Burger', price: '4800'},
  {type: 'burger', menuName: 'Gochujang Mushroom Beef Bulgogi Burger', price: '5200'},
  {type: 'burger', menuName: 'Direct Fire Bulgogi Burger', price: '4800'},
  {type: 'burger', menuName: 'Direct Fire Mushroom Bulgogi Burger', price: '5200'},
  {type: 'burger', menuName: 'Shrimp Whopper Jr.', price: '5800'},
  {type: 'burger', menuName: 'Quatro Cheese Whopper Jr.', price: '5800'},
  {type: 'burger', menuName: 'Whopper Jr.', price: '5200'},
  {type: 'burger', menuName: 'Cheese Whopper Jr.', price: '5500'},
  {type: 'burger', menuName: 'Cheeseburger', price: '4100'},
  {type: 'chicken', menuName: 'Barbecue King Chicken Burger', price: '3800'},
  {type: 'chicken', menuName: 'King Chicken Burger', price: '3800'},
  {type: 'chicken', menuName: 'Long Chicken Burger', price: '5300'},
  {type: 'sidemenu', menuName: 'Shaking Fries', price: '2700'},
  {type: 'sidemenu', menuName: '8 pieces of crispy', price: '12100'},
  {type: 'sidemenu', menuName: 'Crunchy', price: '3500'},
  {type: 'sidemenu', menuName: '21 Cheese Stick', price: '2400'},
  {type: 'sidemenu', menuName: 'Creamy Mozzar Ball', price: '3000'},
  {type: 'sidemenu', menuName: 'Coconut Shrimp', price: '4200'},
  {type: 'sidemenu', menuName: 'Nugget King', price: '2700'},
  {type: 'sidemenu', menuName: 'Cheese Fries', price: '3300'},
  {type: 'sidemenu', menuName: 'French fries', price: '2400'},
  {type: 'sidemenu', menuName: 'Onion Ring', price: '2700'},
  {type: 'sidemenu', menuName: 'coleslaw', price: '2400'},
  {type: 'sidemenu', menuName: 'corn salad', price: '2400'},
  {type: 'drink', menuName: 'Zero Talk Talk', price: '2800'},
  {type: 'drink', menuName: 'Americano', price: '2200'},
  {type: 'drink', menuName: 'Hot/Iced Chocolate', price: '2700'},
  {type: 'drink', menuName: 'Seagram', price: '2500'},
  {type: 'drink', menuName: 'Coca-Cola', price: '2500'},
  {type: 'drink', menuName: 'Coca-Cola Zero', price: '2500'},
  {type: 'drink', menuName: 'Sprite', price: '2500'},
  {type: 'drink', menuName: 'Minute Maid Orange', price: '3400'},
  {type: 'drink', menuName: 'Pure (mineral water)', price: '1900'},
];

*/
