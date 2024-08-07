import {
  editUserData,
  newUserData,
  postUsersListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const postUsersListResult = await postUsersListData(queryInfo)
      const { totalCount, list } = postUsersListResult.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },

    async newUserDataAction(userInfo: any) {
      //1.创建新用户
      const newResult = await newUserData(userInfo)
      console.log(newResult)

      //2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },

    async editUserDataAction(id: number, userInfo: any) {
      //1.更新用户数据
      const editResult = await editUserData(id, userInfo)
      console.log(editResult)

      //2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
