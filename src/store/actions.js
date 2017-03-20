/**
 * Created by zhongqiang.feng on 16/12/9.
 */
import * as types from './modules/list/mutation-types'

export const addToCart = ({ commit }, product) => {
  if (product.inventory > 0) {
    commit(types.ADD_TO_CART, {
      id: product.id
    })
  }
}
