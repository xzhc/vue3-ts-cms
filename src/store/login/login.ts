import { accountLoginRequest } from '@/service/login/login'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    name: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      //1.账号登录，获取token等信息
      const loginResult = await accountLoginRequest(account)
      //console.log(loginResult)
      this.id = loginResult.data.id
      this.name = loginResult.data.name
      this.token = loginResult.data.token

      //2.本地缓存token
      // localStorage.setItem('token', this.token)
      localCache.setCache(LOGIN_TOKEN, this.token)

      //3.跳转到main页面
      router.push('/main')
    }
  }
})

export default useLoginStore
