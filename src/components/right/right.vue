<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-bread level1="权限管理" level2="权限列表" ></my-bread>
    <!-- 表格 -->
    <el-table id="out-table" max-height="400px" :data="rightList" style="width: 100%" class="table">
      <el-table-column align="center" type=index label="#" ></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column label="层级">
        <template slot-scope="rightList">
          <span v-if="rightList.row.level === '0'" >一级</span>
          <span v-if="rightList.row.level === '1'" >二级</span>
          <span v-if="rightList.row.level === '2'" >三级</span>
        </template>
      </el-table-column>
    </el-table>
    <button @click="exportExcel">点击导出</button>
  </el-card>
</template>

<script type="text/ecmascript-6">
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
   data() {
      return {
        rightList:[]
      }
    },
    created(){
      this.getRightList();
    },
    methods:{
      //导出表格
      //定义导出Excel表格事件
        exportExcel() {
        /* 从表生成工作簿对象 */
        var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
        /* 获取二进制字符串作为输出 */
        var wbout = XLSX.write(wb, {
            bookType: "xlsx",
            bookSST: true,
            type: "array"
        });
        try {
            FileSaver.saveAs(
            //Blob 对象表示一个不可变、原始数据的类文件对象。
            //Blob 表示的不一定是JavaScript原生格式的数据。
            //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
            //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
            new Blob([wbout], { type: "application/octet-stream" }),
            //设置导出文件名称
            "sheetjs.xlsx"
            );
        } catch (e) {
            if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
    },
      async getRightList(){
        const res = await this.axios.get('rights');
        this.rightList = res.data;
        console.log(res)
      }
    }
};
</script>

<style>
.box-card {
  height: 100%;
}
.table{
    margin-top:20px;
}
</style>
