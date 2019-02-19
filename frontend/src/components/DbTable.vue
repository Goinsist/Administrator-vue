<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%"
                header-row-class-name="center"
                class="table">

            <el-table-column
                    fixed
                    prop="lineId"

                    label="ID"
                    width="70">

            </el-table-column>
            <el-table-column
                    prop="lineName"
                    label="轮播图名字"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="lineLink"
                    label="跳转链接"
                    width="220">
            </el-table-column>
            <el-table-column
                    prop="lineImg"
                    label="轮播图地址"
                    width="290">
            </el-table-column>
            <el-table-column
                    prop="priority"
                    label="优先级"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="enableStatus"
                    label="可用状态"
                    width="80"
                     >
              <template slot-scope="scope" >
                <el-tag v-if="scope.row!=null" :type="scope.row.enableStatus===1?'success':'warning'" >{{scope.row.enableStatus===1?'可用':'不可用'}}</el-tag>
              </template>



            </el-table-column>

          <el-table-column
            prop="lastEditTime"
            label="更新时间"
            width="180"
           :formatter="formatterL">
          </el-table-column>
            <el-table-column
                  fixed="right"
                    prop="operation"
                    label="操作"
                    width="200">
              <template slot="header" >
                <el-button type="success" icon="el-icon-circle-plus-outline" size="medium" @click="editItem(null,null)">添加</el-button>
              </template>
                <template slot-scope="scope" >
                    <el-button
                      type="primary" icon="el-icon-edit" size="small"
                      @click="editItem(scope.$index,tableData)">编辑</el-button>
                    <el-button
                      type="primary" icon="el-icon-delete" size="small"
                      @click="handleDelete(scope.$index, tableData)">删除</el-button>


                </template>
            </el-table-column>
        </el-table>
      <el-pagination  @current-change="changePage" background :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
      </el-pagination>
        <db-modal :dialogFormVisible="dialogFormVisible" :form="form" v-on:canclemodal="dialogVisible"></db-modal>
    </div>

</template>

<script>
    import Bus from '../eventBus'
    import DbModal from './DbModal.vue'

    export default {
        data(){
            return {
                tableData: [],
                apiUrl: 'http://47.99.54.87/o2o/headline',

                total: 0,
                pageSize: 5,
                currentPage: 1,

              dialogFormVisible: false,
                form:{

                },



            }
        },

        components: {
           'db-modal': DbModal
        },
          mounted () {
            this.getCustomers();

            Bus.$on('filterResultData', (data) => {
                this.tableData = data.results;
                this.total = data.total_pages;
                this.pageSize = data.count;
                this.email = data.email;
                this.sex = data.sex;

            });
        },

        methods: {
             handleDelete:function(index,rows) {
               const lineId = rows[index].lineId;
               this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                 confirmButtonText: '确定',
                 cancelButtonText: '取消',
                 type: 'warning'
               }).then(() => {
                 this.$axios.post('http://47.99.54.87/o2o/headline/deletebyid?lineId='+lineId).then((response) => {
                   if (response.data.success) {
                     this.$message({
                       type: 'success',
                       message: '删除成功!'
                     });
                   }else {
                     this.$message({
                       type: 'error',
                       message: '删除失败!'
                     });
                   }
                 })

               }).catch(() => {
                 this.$message({
                   type: 'info',
                   message: '已取消删除'
                 });
               });


             },
            dialogVisible: function () {
                this.dialogFormVisible = false;
                this.form={}
            },

            getCustomers: function () {

                this.$axios.get(this.apiUrl,{

                  params:{
                    pageIndex:this.currentPage,
                    pageSize:this.pageSize,

                  }
                  }
                ).then((response) => {

                this.total=response.data.total;

                    this.tableData = response.data.lineList;


                    console.log(response.data.lineList);
                }).catch(function (response) {
                    console.log(response)
                });
            },
            changePage: function (currentPage) {
                this.currentPage = currentPage;
                this.getCustomers()
            },
            editItem: function (index, rows) {
                this.dialogFormVisible = true;


               if(index==null&&rows==null){
                 this.form={};

               }else {
                 const lineId = rows[index].lineId;
                 const idurl = 'http://47.99.54.87/o2o/headline/getheadlinebyid?lineId=' + lineId;
                 this.$axios.get(idurl).then((response) => {
                   this.form = response.data.headLine;

                   console.log(response.data.headLine);
                 }).catch(function (response) {
                   console.log(response)
                 });
               }
    },

            formatter(row, column) {
                let data = this.$moment(row.createTime, this.$moment.utf-8);
                return data.format('YYYY-MM-DD HH:mm:ss')
            },
          formatterL(row, column) {
            let data = this.$moment(row.lastEditTime, this.$moment.utf-8);
            return data.format('YYYY-MM-DD HH:mm:ss')
          },

          }
    }
</script>

<style scoped>
    .table {
        margin-top: 30px;
    }

    .pagination {
        margin-top: 10px;
        float: right;
    }
    .center th {
      text-align: center;
    }

</style>
