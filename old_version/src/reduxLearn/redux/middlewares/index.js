export const loggerMiddleware = store => next => action => {
  const result = next(action)
  console.log(store.getState());
  return result
}