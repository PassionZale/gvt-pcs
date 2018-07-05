import {
  login,
  logout
} from '../../api/auth'

const user = {
  state: {
    username: '',
    role: '',
  },

  mutations: {
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_ROLE: (state, role) => {
      state.role = role
    }
  },

  actions: {
    LogIn({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        login(params).then(response => {
          commit('SET_USERNAME', params.username)
          // 暂时硬编码为 admin
          commit('SET_ROLE', 'admin')
          resolve(response)
        }).catch(error => {
          reject(error.response.data)
        })
      })
    },
    LogOut({
      commit
    }) {
      return new Promise((resolve, reject) => {
        logout().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error.response)
        })
      })
    }
  }
}

export default user
