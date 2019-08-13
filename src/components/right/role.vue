<template>
  <el-card class="box-card">
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-button @click="showAddRoleDia()" class="abutton" type="success" plain>添加角色</el-button>
    <!-- 表格 -->
    <el-table  class="table" :data="roleList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="roleList">
          <el-row v-for="(item,i) in roleList.row.children" :key="i">
            <el-col :span="4">
              <el-tag
                @close="deleRight(roleList.row.id,item.id)"
                disable-transitions
                closable
              >{{item.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2,i) in item.children" :key="i">
                <el-col :span="4">
                  <el-tag
                    @close="deleRight(roleList.row.id,item2.id)"
                    disable-transitions
                    type="success"
                    closable
                  >{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    @close="deleRight(roleList.row.id,item3.id)"
                    disable-transitions
                    type="warning"
                    closable
                    v-for="(item3,i) in item2.children"
                    :key="i"
                  >{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" align="center"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="roleList">
          <el-button
            @click="showEditRolDia(roleList.row)"
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            @click="showDelRolDia(roleList.row)"
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
          <el-button
            @click="showSetRightDia(roleList.row)"
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加表单  -->
    <el-dialog title="添加" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px">
          <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addRole()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑表单 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px">
          <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editRole()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 权限 -- 编辑 -->
    <el-dialog title="权限编辑" :visible.sync="dialogFormVisibleRight">
      <template>
        <el-tree
          default-expand-all
          :data="treeList"
          show-checkbox
          node-key="id"
          :props="defaultProps"
        ></el-tree>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleRight = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  data() {
    return {
      test: 1,
      roleList: [],
      form: {
        roleName: "",
        roleDesc: ""
      },
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRight: false,
      treeList: [],
      arrExpand: [],
      defaultProps: {
        children: "children",
        label: "authName"
      }
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    //修改权限 -- 显示
    async showSetRightDia(role) {
      this.dialogFormVisibleRight = true;
      const res = await this.axios.get(`rightsTree`);
      this.treeList = res.data;
      console.log(role)
      // const arrExpand1 = [];
      // this.treeList.forEach(item => {
      //   arrExpand1.push(item.id);
      //   item.children.forEach(item2 => {
      //     arrExpand1.push(item2.id);
      //     item2.children.forEach(item3 => {
      //       arrExpand1.push(item3.id);
      //     });
      //   });
      // });
      // this.arrExpand = arrExpand1;
    },
    //取消权限 没整明白
    async deleRight(roleId, rightId) {
      console.log(roleId, rightId);
      const res = await this.axios.delete(`rights/${rightId}`);
      console.log(res);
      this.getRoleList();
    },
    //编辑 -- 确认
    async editRole() {
      this.dialogFormVisibleEdit = false;
      const res = await this.axios.put(`roles/${this.form.id}`, this.form);
      this.getRoleList();
    },
    //编辑 -- 显示
    async showEditRolDia(user) {
      this.dialogFormVisibleEdit = true;
      const res = await this.axios.get(`roles/${user.id}`);
      this.form = res.data;
    },
    //添加 -- 确认
    async addRole() {
      this.dialogFormVisibleAdd = false;
      const res = await this.axios.post("roles", this.form);
      this.getRoleList();
      this.form = {};
    },
    //添加 -- 显示
    showAddRoleDia() {
      this.dialogFormVisibleAdd = true;
    },
    //删除
    showDelRolDia(role) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.axios.delete(`roles/${role.id}`);
          this.getRoleList();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async getRoleList() {
      const res = await this.axios.get("roles");
      this.roleList = res.data;
    }
  }
};
</script>

<style>
.box-card {
  height: 100%;
}
.table {
  margin-top: 20px;
}
.abutton {
  margin-top: 20px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
