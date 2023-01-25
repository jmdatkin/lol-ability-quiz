// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

enum AbilitySlot {
    PASSIVE,
    Q,
    W,
    E,
    R
};

type Ability = {
    name: string,
    champion: string,
    slot: AbilitySlot
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Ability[]>
) {
//   res.status(200).json({ name: 'John Doe' })
}
