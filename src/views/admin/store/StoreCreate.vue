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
        <CheckboxGroup v-model="selectedWarehouseStr" @on-change="handleWarehouseChange">
            <Checkbox v-for="item in warehouses" :key="item.warehouseId" :label="item.warehouseId">{{item.warehouseName}}</Checkbox>
        </CheckboxGroup>
      </FormItem>
      <hr>
      <Button type="primary"  @click="handleSubmit" :loading="btnLoading">确认</Button>
    </Form>
</template>

<script>
import { CREATE_STORE_FORM_VALIDATION } from "../../../validations/admin";
import { getAllwarehouse,managerStoreInfo } from "../../../api/admin/store";
export default {
  data() {
    return {
      warehouses: [],
      btnLoading: false,
      indeterminate: false,
      checkAll: false,
      selectedWarehouseStr: [],
      noSelectedWarehouseStr: [],
      formData: {
        bind: "",
        userName: "",
        userId: "",
        userNo: "",
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
<<<<<<< HEAD
        isAddOrUpdate: "",
        selectedWarehouseStr: "",//选中仓库
        noSelectedWarehouseStr: "",//未选中仓库
=======
        checkedWarehouseList: [],
        unCheckedWarehouseList: []
>>>>>>> 30dee432a831ec67e2237a653503bf4a896b34a3
      },
      formRule: CREATE_STORE_FORM_VALIDATION
    };
  },
  computed: {
    $warehouseIds() {
      return this.warehouses.map(item => {
<<<<<<< HEAD
        return item.warehouseId
=======
        return item.warehouseId;
>>>>>>> 30dee432a831ec67e2237a653503bf4a896b34a3
      });
    }
  },
  created() {
    getAllwarehouse()
      .then(response => {
        this.warehouses = response;
<<<<<<< HEAD
        this.noSelectedWarehouseStr = this.$warehouseIds;
=======
        this.formData.unCheckedWarehouseList = this.$warehouseIds;
>>>>>>> 30dee432a831ec67e2237a653503bf4a896b34a3
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
<<<<<<< HEAD
        this.selectedWarehouseStr = this.$warehouseIds;
        this.selectedWarehouseStr = [];
      } else {
        this.selectedWarehouseStr = [];
      }
    },
    handleWarehouseChange(data) {
      this.noSelectedWarehouseStr = this.$warehouseIds.filter(item => {
        return this.selectedWarehouseStr.indexOf(item) === -1
=======
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
>>>>>>> 30dee432a831ec67e2237a653503bf4a896b34a3
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
      let selectedWarehouseStr = '',noSelectedWarehouseStr = '';

      this.selectedWarehouseStr.forEach(item =>{
        selectedWarehouseStr += item + '~';
      });
      this.noSelectedWarehouseStr.forEach(item =>{
        noSelectedWarehouseStr += item + '~';
      });
      this.formData.selectedWarehouseStr = selectedWarehouseStr;
      this.formData.noSelectedWarehouseStr = noSelectedWarehouseStr;
      this.formData.isAddOrUpdate = "add";

      managerStoreInfo(this.formData)
        .then(response =>{
          if(response.success)
          {
            this.$Message.success('操作成功');
          }else {
            this.$Message.success('操作失败');
          }
        });
    }
  }
};
</script>

