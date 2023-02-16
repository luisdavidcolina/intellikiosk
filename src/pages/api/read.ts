import getHandler from '@/pages/api/getHandler'
const { GlobalKeyboardListener } = require("node-global-key-listener");

const fun = () => {
    const keyboardListener = new GlobalKeyboardListener();
    keyboardListener.addListener((event, down) => {
      const isDown = event.state == "DOWN";
      const isLetter = event.name.length === 1;
      if (isDown && isLetter) {
        const key = event.name.toLowerCase();
        console.log(key);
      }
    });
  };

const handler = getHandler()

handler.get(async (req, res) => {
  try {
    fun()
    res.status(200).json('ok')
  }
  catch (err) {
    res.status(200).json(4)
  }
})

export default handler
