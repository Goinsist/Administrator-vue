<template>
    <el-dialog title="编辑"  :visible.sync="dialogFormVisible" :close-on-click-modal="false" :show-close="false">
        <el-form :model="form" :rules="rules" ref="ruleForm" status-icon>
            <el-form-item label="轮播图ID" :label-width="formLabelWidth">
                <el-input :disabled="true" v-model="form.lineId" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="轮播图名字" :label-width="formLabelWidth" prop="lineName">
                <el-input  v-model="form.lineName" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="跳转链接" :label-width="formLabelWidth">
                <el-input  v-model="form.lineLink" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="轮播图上传" label-width="120px">
              <el-upload

                class="upload-demo"
                action=""
                :auto-upload="false"
                accept="image/jpeg,image/gif,image/png"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
               :before-upload="beforeUpload"
                :before-remove="beforeRemove"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
                ref="uploadLine"
                list-type="picture"

                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>

            </el-form-item>
            <el-form-item label="优先级" :label-width="formLabelWidth" prop="priority">
                <el-input  v-model.number="form.priority" auto-complete="off" style="width: 90px"></el-input>
              <el-tag type="warning">数字越高，图片排列越靠前</el-tag>
            </el-form-item>
            <el-form-item label="可用状态" :label-width="formLabelWidth">
              <template>
                <el-radio-group v-model="form.enableStatus">
                <el-radio  :label="0">不可用</el-radio>
                <el-radio  :label="1">可用</el-radio>
                </el-radio-group>
              </template>
        </el-form-item>
          <el-form-item label="更新时间" label-width="120px" >
            <el-date-picker
              :disabled="true"
              v-model="form.lastEditTime"
              type="datetime"
              >
            </el-date-picker>

          </el-form-item>


          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button :plain="true" type="danger" v-on:click="canclemodal">取消</el-button>
            <el-button :plain="true" @click="validateForm('ruleForm')">提交</el-button>
        </div>
    </el-dialog>
</template>


<script>
    export default {
        data(){

          var checkPriority = (rule, value, callback) => {
              if (!value) {
                return callback(new Error('优先级不能为空!'));
              }
              setTimeout(() => {
                if (!Number.isInteger(value)) {
               return   callback(new Error('请输入数字值'));
                } else {
                  if (value < 0||value>100) {
                   return callback(new Error('数字必须在0-100之间'));
                  } else {
                   return callback();
                  }
                }
              }, 1000);
            };
            return {

              rules:{
                priority:[  {validator:checkPriority, trigger: 'blur'}

        ],
                lineName:[ { required: true, message: '请输入轮播图名字', trigger: 'blur' },
                  { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }]
              },
                 fileList:[],
                formLabelWidth: '120px',

             ruleForm:{
                priority:'',
                lineName:''
              },

            };
        },

      props:['dialogFormVisible','form'],

        methods: {

          handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
          },
          beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
          },


          handleRemove(file, fileList) {
            console.log(fileList);
            console.log(file);
          },
          handlePreview(file) {
            console.log(file);
          },

     beforeUpload(file){

       let data=this.form;
       let headLine={};
       let lineId=data.lineId;
       headLine.lineName=data.lineName;
       headLine.lineLink=data.lineLink;
       let lineImg=file;
       headLine.priority=data.priority;
       headLine.enableStatus=data.enableStatus;
       let formData=new FormData();
       formData.append('headLine',JSON.stringify(headLine));
       formData.append('lineImg',lineImg);
       this.$axios.post('http://47.99.54.87/o2o/headline/updateheadlinebyid?lineId=' + lineId,formData)
         .then(function (response) {
           console.log(response);

         })
         .catch(function (error) {
           console.log(error);
         });

        location.reload();
     },
            validateForm(formName) {


              this.$refs[formName].validate((valid) => {
                if (valid) {
              this.$refs.uploadLine.submit();
                } else {
                  console.log('error submit!!');
                  return false;
                }
              });
            },


          canclemodal: function () {
            this.$emit('canclemodal');
          }

        }

    }

</script>









