interface NormalizeObject<T> {
  byId: { [key: string]: T } // if need without key Omit<T, 'id'>
  allIds: Array<string>
}

interface Item {
  id: string
}

export function normalize<T extends Item>(items: Array<T>): NormalizeObject<T> {
  return items.reduce<NormalizeObject<T>>(
    (acc, item: T) => ({
      byId: {
        ...acc.byId,
        [item.id]: item // if need without id Omit<T, 'id'>
      },
      allIds: [...acc.allIds, item.id]
    }),
    {
      byId: {},
      allIds: []
    }
  )
}
