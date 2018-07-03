<template>
    <Form ref="createForm" :model="formData" :rules="formRule" :label-width="80" inline>
      <FormItem label="用户名:" prop="userName">
          <Input type="text" v-model="formData.userName" placeholder="请输入用户名" style="width:300px;"></Input>
      </FormItem>
      <FormItem label="密码:" prop="passWord">
          <Input type="password" v-model="formData.passWord" placeholder="请输入用密码" style="width:300px;"></Input>
      </FormItem>
      <FormItem label="门店名称:" prop="storeName">
          <Input type="text"  v-model="formData.storeName" placeholder="请输入门店名称" style="width:300px;"></Input>
      </FormItem>
      <FormItem label="门店编号:" prop="editStoreNo">
          <Input type="text"  v-model="formData.editStoreNo" placeholder="请输入门店编号" style="width:300px;"></Input>
      </FormItem>
      <FormItem label="联系人:" prop="contactMan">
          <Input type="text"  v-model="formData.contactMan" placeholder="请输入联系人" style="width:300px;"></Input>
      </FormItem>
      <FormItem label="手机号码:" prop="phoneNum">
          <Input v-model="formData.phoneNum" placeholder="请输入手机号码" style="width:300px;"></Input>
      </FormItem>
      <FormItem label="电子邮箱:" prop="editEmail">
          <Input v-model="formData.editEmail" placeholder="请输入电子邮箱" style="width:300px;"></Input>
      </FormItem>
      <FormItem label="URL:" prop="url">
          <Input v-model="formData.url" placeholder="请输入 URL" style="width:300px;"></Input>
      </FormItem>
      <FormItem label="ApiKey:" prop="apiKey">
          <Input v-model="formData.apiKey" placeholder="请输入 ApiKey" style="width:300px;"></Input>
      </FormItem>
      <FormItem label="ApiSecret:" prop="apiSecret">
          <Input v-model="formData.apiSecret" placeholder="请输入 ApiSecret" style="width:300px;"></Input>
      </FormItem>
      <FormItem label="经度:" prop="longitude">
          <Input v-model="formData.longitude" placeholder="请输入经度" style="width:300px;"></Input>
      </FormItem>
      <FormItem label="纬度:" prop="latitude">
          <Input v-model="formData.latitude" placeholder="请输入纬度" style="width:300px;"></Input>
      </FormItem>
      <FormItem label="详细地址:" prop="detailAddress">
          <Input v-model="formData.detailAddress" placeholder="请输入详细地址" style="width:300px;"></Input>
      </FormItem>
      <FormItem label="ABN:" prop="storeAbn">
          <Input v-model="formData.storeAbn" placeholder="请输入 ABN" style="width:300px;"></Input>
      </FormItem>
      <!-- 仓库 CHECKBOX -->
      <FormItem label="绑定仓库:">
        <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
          <Checkbox
              :indeterminate="indeterminate"
              :value="checkAll"
              @click.prevent.native="handleCheckAll">全选</Checkbox>
        </div>
        <CheckboxGroup v-model="formData.checkedWarehouseList" @on-change="handleWarehouseChange">
            <Checkbox v-for="item in warehouses" :key="item.warehouseId" :label="item.warehouseId">{{item.warehouseId}}</Checkbox>
        </CheckboxGroup>
      </FormItem>
      <hr>
      <Button type="primary"  @click="handleSubmit" :loading="btnLoading">确认</Button>
    </Form>
</template>

<script>
import { CREATE_STORE_FORM_VALIDATION } from "../../../validations/admin";
import { getAllwarehouse } from "../../../api/admin/store";
export default {
  data() {
    return {
      warehouses: [],
      btnLoading: false,
      indeterminate: false,
      checkAll: false,
      formData: {
        userName: "",
        passWord: "",
        storeName: "",
        editStoreNo: "",
        contactMan: "",
        phoneNum: "",
        editEmail: "",
        url: "",
        apiKey: "",
        apiSecret: "",
        longitude: "",
        latitude: "",
        detailAddress: "",
        storeAbn: "",
        checkedWarehouseList: [],
        unCheckedWarehouseList: []
      },
      formRule: CREATE_STORE_FORM_VALIDATION
    };
  },
  computed: {
    $warehouseIds() {
      return this.warehouses.map(item => {
        return item.warehouseId;
      });
    }
  },
  created() {
    getAllwarehouse()
      .then(response => {
        this.warehouses = response;
        this.formData.unCheckedWarehouseList = this.$warehouseIds;
      })
      .catch();
  },
  methods: {
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.formData.checkedWarehouseList = this.$warehouseIds;
        this.formData.unCheckedWarehouseList = [];
      } else {
        this.formData.checkedWarehouseList = [];
        this.formData.unCheckedWarehouseList = this.$warehouseIds;
      }
    },
    handleWarehouseChange(data) {
      this.formData.unCheckedWarehouseList = this.$warehouseIds.filter(item => {
        return this.formData.checkedWarehouseList.indexOf(item) === -1
      });
      let len = this.warehouses.length;
      if (data.length === len) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
    handleSubmit() {
      this.btnLoading = true;
    }
  }
};
</script>

