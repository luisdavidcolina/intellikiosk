

import getHandler from '@/pages/api/getHandler'

import {print} from './util'

const handler = getHandler()


handler.get(async (req, res) => {
  try {
    await print()
    res.status(200).json('hola')
  }
  catch (err) {
    res.status(200).json(4)
  }
})

export default handler
