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
                <template slot-scope="scope" >
                    <el-button
                      type="primary" icon="el-icon-edit" size="small"
                      @click="editItem(scope.$index,tableData)">编辑</el-button>
                    <el-button
                      type="primary" icon="el-icon-delete" size="small"
                      @click="handleDelete(scope.$index, scope.tableData)">删除</el-button>


                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pagination" layout="prev, pager, next" :total="total" :page-size="pageSize"
                       v-on:current-change="changePage">
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
                pageSize: 10,
                currentPage: 1,
                sex: '',
                email: '',
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

            dialogVisible: function () {
                this.dialogFormVisible = false;
            },

            getCustomers: function () {

                this.$axios.get(this.apiUrl).then((response) => {

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
                const lineId = rows[index].lineId;

                const idurl = 'http://47.99.54.87/o2o/headline/getheadlinebyid?lineId=' + lineId;
                this.$axios.get(idurl).then((response) => {
                    this.form = response.data.headLine;

    console.log(response.data.headLine);
    }).catch(function (response) {
      console.log(response)
    });
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

<style>
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
