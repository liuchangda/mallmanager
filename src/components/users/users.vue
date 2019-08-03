<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 &添加用户 -->
    <el-row class="searchRow">
      <el-col>
        <el-input
          clearable
          @clear="loadUserList()"
          v-model="query"
          placeholder="请输入内容"
          class="inputSearch"
        >
          <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button @click="showAddUserDia()" type="success" plain>添加</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table max-height="300px" :data="userList" style="width: 100%" class="table">
      <el-table-column align="center" type="index" label="#"></el-table-column>
      <el-table-column align="center" prop="username" label="姓名"></el-table-column>
      <el-table-column align="center" prop="email" label="邮箱"></el-table-column>
      <el-table-column align="center" prop="mobile" label="电话"></el-table-column>
      <el-table-column label="创建日期">
        <template slot-scope="userList">{{userList.row.creat_time | fmdate}}</template>
      </el-table-column>
      <el-table-column prop label="用户状态">
        <template slot-scope="userList">
          <el-switch
            @change="changeMgState(userList.row)"
            v-model="userList.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop label="操作" width="180px">
        <template slot-scope="userList">
          <el-button
            @click="showEditUserDia(userList.row)"
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            @click="showDUserDia(userList.row.id)"
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
          <el-button
            @click="showSetUserRolDia(userList.row)"
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- /添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input disabled v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRol">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <span>{{form.username}}</span>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="currentId" placeholder="请选择活动区域">
            <el-option disabled label="请选择" :value="-1"></el-option>
            <el-option v-for="(item ,i) in roles" :key="i" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRol = false">取 消</el-button>
        <el-button type="primary" @click="setRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script type="text/ecmascript-6">
import { async } from "q";
export default {
  name: "",
  data() {
    return {
      currentId: -1,
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      formLabelWidth: "120px",
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRol: false,
      query: "",
      pagenum: 1,
      pagesize: 2,
      userList: [],
      roles: [],
      total: 0
    };
  },
  created() {
    this.getUserList();
  },
  watch: {
    query(n, o) {
      this.axios.get("users?username_like=" + n).then(res => {
        this.userList = res.data;
      });
    }
  },
  methods: {
    //分配角色 -- 发送请求
    async setRole() {
      this.form.rid = this.currentId;
      const res = await this.axios.put(`users/${this.form.id}`, this.form);
      this.dialogFormVisibleRol = false;
    },
    //分配角色 -- 显示对话框
    async showSetUserRolDia(user) {
      this.dialogFormVisibleRol = true;
      this.form = user;
      const res = await this.axios.get("roles");
      this.currentId = user.rid;
      this.roles = res.data;
    },
    //改变状态
    async changeMgState(user) {
      const res = await this.axios.put(`users/${user.id}`, user);
    },
    //编辑 确定-->提交数据
    async editUser() {
      this.dialogFormVisibleEdit = false;
      const res = await this.axios.put(`users/${this.form.id}`, this.form);
      this.getUserList();
    },
    //编辑 显示对话框 form内容
    async showEditUserDia(user) {
      this.dialogFormVisibleEdit = true;
      this.form = user;
    },
    //删除
    showDUserDia(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.axios.delete(`users/${id}`);
          if (res.status === 200) {
            this.getUserList();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //添加 发送请求
    async addUser() {
      this.dialogFormVisibleAdd = false;
      const res = await this.axios.post(`users`, this.form);
      this.getUserList();
      this.form = {};
    },
    // 添加 显示对话框
    showAddUserDia() {
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    loadUserList() {
      this.getUserList();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    async getUserList() {
      const res = await this.axios.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      this.userList = res.data;
      this.total = this.userList.length;
    }
  },
  components: {}
};
</script>

<style>
.box-card {
  height: 100%;
}
.inputSearch {
  width: 50%;
}
.searchRow {
  margin-top: 20px;
}
.table {
  margin-top: 20px;
}
</style>
