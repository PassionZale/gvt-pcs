import {
  login
} from '../../api/auth'

const user = {
  state: {
    username: '',
    role: '',
    logged: false,
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
          resolve(response)
        }).catch(error => {
          reject(error.response.data)
        })
      })
    },
    LogOut() {
      // TODO
    }
  }
}

export default user
