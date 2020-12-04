interface NormalizeObject<T> {
  byId: { [key: string]: T } // if need without key Omit<T, 'id'>
  allIds: Array<string>
}

type TupleItem<T extends unknown[]> = [...T]

export function normalizeTuples<T extends TupleItem<T>>(
  items: Array<T>
): NormalizeObject<T> {
  return items.reduce<NormalizeObject<T>>(
    (acc, item: T) => {
      const id = item[0]

      return {
        byId: {
          ...acc.byId,
          [id]: item // if need without "id" Omit<T, 'id'>
        },
        allIds: [...acc.allIds, id]
      }
    },
    {
      byId: {},
      allIds: []
    }
  )
}

interface Item {
  id: string
}

// function getId(arg: [number] | { id: number }): number {
//   return Array.isArray(arg) ? arg[0] : arg.id;
// }

export function normalize<T extends Item>(items: Array<T>): NormalizeObject<T> {
  return items.reduce<NormalizeObject<T>>(
    (acc, item: T) => {
      return {
        byId: {
          ...acc.byId,
          [item.id]: item
        },
        allIds: [...acc.allIds, item.id]
      }
    },
    {
      byId: {},
      allIds: []
    }
  )
}
