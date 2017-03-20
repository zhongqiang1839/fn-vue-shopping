/**
 * Created by zhongqiang.feng@feiniu.com on 16/12/9.
 */
import * as types from './mutation-types'

/**
 * 全局
 * state store
 * @type {Vuex.Store}
 */
const store = {

    state: {

        direction: 'forward'

    },

    /**
     * vuex 2.0 action should be await
     */
    actions: {

        renderPage: ({ commit }, { body }) => {


        }

    },

    /**
     * even vuex 2.0 mutations should be async
     */
    mutations: {

        [types.UPDATE_DIRECTION](state, payload) {

            state.direction = payload.direction

        }

    },

    getters: {

    }
}

export default store
