<template>
  <div class="modal">
    <el-dialog
      v-model="dialogFormVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              v-model="formData.realname"
              placeholder="请输入真实姓名"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="formData.password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="formData.cellphone"
              placeholder="请输入手机号码"
            />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select
              v-model="formData.roleId"
              placeholder="请选择角色"
              style="width: 100%"
            >
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select
              v-model="formData.departmentId"
              placeholder="请选择部门"
              style="width: 100%"
            >
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { ref, reactive } from 'vue'
const dialogFormVisible = ref(false)
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

const isNewRef = ref(true)
const editData = ref()

//获取roles/departments数据
const mainStore = useMainStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)
const systemStore = useSystemStore()
//设置dialogVisible和初始化formData
function setModalVisible(isNew: boolean = true, itemData?: any) {
  dialogFormVisible.value = true
  isNewRef.value = isNew
  initializeFormData(itemData)
}

//初始化formData,根据是否是新建或编辑状态
function initializeFormData(itemData?: any) {
  if (!isNewRef.value && itemData) {
    //编辑模式：填充表单数据
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    //新建模式：清空表单数据
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}

//处理确定按钮的点击事件
function handleConfirmClick() {
  dialogFormVisible.value = false
  if (isNewRef.value) {
    //新建用户
    createNewUser()
  } else {
    //编辑用户
    updateExistingUser()
  }
}

//新建用户逻辑
function createNewUser() {
  systemStore.newUserDataAction(formData)
}

//编辑用户逻辑
function updateExistingUser() {
  if (editData.value) {
    systemStore.editUserDataAction(editData.value.id, formData)
  }
}
defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
