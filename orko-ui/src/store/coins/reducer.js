import Immutable from "seamless-immutable"
import * as types from "./actionTypes"

const initialState = Immutable({
  coins: Immutable([]),
  referencePrices: Immutable({}),
  meta: Immutable({})
})

export default function reduce(state = initialState, action = {}) {
  var newCoins
  switch (action.type) {
    case types.SET:
      return Immutable.merge(state, { coins: action.payload })
    case types.SET_META:
      return Immutable.merge(
        state,
        {
          meta: {
            [action.payload.coin.key]: {
              ...action.payload.meta,
              amountScale: action.payload.meta.priceScale === 8 ? 0 : 8
            }
          }
        },
        { deep: true }
      )
    case types.ADD:
      newCoins = state.coins.concat([action.payload])
      return Immutable.merge(state, { coins: newCoins })
    case types.REMOVE:
      newCoins = state.coins.filter(c => c.key !== action.payload.key)
      return Immutable.merge(state, { coins: newCoins })
    case types.SET_REFERENCE_PRICE:
      return Immutable.merge(
        state,
        {
          referencePrices: {
            [action.payload.coin.key]: action.payload.price
          }
        },
        { deep: true }
      )
    case types.SET_REFERENCE_PRICES:
      return Immutable.merge(state, { referencePrices: action.payload })
    default:
      return state
  }
}