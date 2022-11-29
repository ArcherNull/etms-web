<!--
 * @Author: Null
 * @Date: 2022-11-29 09:34:26
 * @Description: 数据加密
-->
<template>
  <div class="DataEncryption">
    <el-form ref="dataEncForm" label-width="130px" :rules="dataEncFormRules" :model="dataEncForm">
      <el-form-item label="数据来源" prop="dataSource">
        <el-radio-group v-model="dataEncForm.dataSource" @change="changeDataSource">
          <el-radio
            v-for="(item,index) in dataSourceList"
            :key="index"
            :label="item.value"
          >{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="当前数据" prop="data">
        <div v-if="dataEncForm.dataSource === 'tableData'">{{ dataEncForm.data }}</div>
        <el-input
          v-else-if="dataEncForm.dataSource === 'text'"
          v-model="dataEncForm.data"
          maxlength="500"
          :rows="4"
          show-word-limit
          type="textarea"
          placeholder="请输入当前数据"
          clearable
        />
      </el-form-item>

      <el-form-item label="加密串" prop="encryptedString">
        <el-input
          v-model="dataEncForm.encryptedString"
          class="encryptedString-input"
          placeholder="请输入加密串"
          clearable
        />
        <span class="encryptedString-btn">
          <MyButton type="text" @click="generateEncString">随机生成</MyButton>
        </span>
      </el-form-item>

      <el-form-item label="加密规则" prop="encryptionRules">
        <el-select v-model="dataEncForm.encryptionRules" placeholder="请选择加密规则" clearable>
          <el-option
            v-for="(item,index) in encryptionRulesList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="生成方式" prop="generateMode">
        <el-radio-group v-model="dataEncForm.generateMode">
          <el-radio
            v-for="(item,index) in generateModeList"
            :key="index"
            :label="item.value"
          >{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="生成结果">
        <div v-if="generateResults">
          <div v-if="dataEncForm.generateMode === 'link'">
            链接为： <a :href="generateResults" target="_blank"> {{ generateResults }} </a>
          </div>

          <div v-else-if="dataEncForm.generateMode === 'qrCode'">
            <MyQrcode />
          </div>

          <div v-else>
            <MyBarCode />
          </div>
        </div>
        <div v-else class="dk-danger-text">
          暂无结果，请点击生成
        </div>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'DataEncryption',
  components: {
    MyButton: () => import('../../../MyButton/index.vue'),
    MyQrcode: () => import('../../../MyQrcode/index.vue'),
    MyBarCode: () => import('../../../MyBarCode/index.vue')

  },
  data () {
    return {
      generateResults: '', // 生成结果
      // 数据来源列表
      dataSourceList: [
        {
          label: '表格数据',
          value: 'tableData'
        },
        {
          label: '文本',
          value: 'text'
        }
      ],

      // 加密规则列表
      encryptionRulesList: [
        {
          label: '加密规则一',
          value: 'rule1'
        },
        {
          label: '加密规则二',
          value: 'rule2'
        },
        {
          label: '加密规则三',
          value: 'rule3'
        }
      ],

      // 生成方式
      generateModeList: [
        {
          label: '链接',
          value: 'link'
        },
        {
          label: '二维码',
          value: 'qrCode'
        },
        {
          label: '条形码',
          value: 'barCode'
        }
      ],

      dataEncForm: {
        dataSource: 'tableData',
        data: '123123',
        encryptedString: '',
        encryptionRules: '',
        generateMode: 'link'
      },
      dataEncFormRules: {
        exportMode: [
          {
            required: true,
            message: '请选择数据来源',
            trigger: ['blur', 'change']
          }
        ],
        data: [
          {
            required: true,
            message: '请输入当前数据',
            trigger: ['blur', 'change']
          }
        ],
        encryptedString: [
          {
            required: true,
            message: '请选择加密串',
            trigger: ['blur', 'change']
          }
        ],
        encryptionRules: [
          {
            required: true,
            message: '请选择加密规则',
            trigger: ['blur', 'change']
          }
        ],
        generateMode: [
          {
            required: true,
            message: '请选择生成方式',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    // 数据来源改变
    changeDataSource (ele) {
      console.log('数据来源改变', ele)
    },
    // 随机生成加密串
    generateEncString () {
      console.log('随机生成加密串')
      this.dataEncForm.encryptedString = this.generateOrderNumber('RA')
    },
    // 表单提交
    onSubmit () {
      this.$refs.dataEncForm.validate((valid) => {
        if (valid) {
          this.generateResults = 'https://www.baidu.com'
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 生成随机字符串
    generateOrderNumber (prefix = 'No', length = 4) {
      const format = (num) => (num > 9 ? num : '0' + num)
      const now = new Date()
      const year = now.getFullYear().toString()
      const month = format((now.getMonth() + 1).toString())
      const day = format(now.getDate().toString())
      const hour = format(now.getHours().toString())
      const minutes = format(now.getMinutes().toString())
      // 存放订单号
      let num = ''
      // N位随机数(加在时间戳后面)
      for (var i = 0; i < length; i++) {
        num += Math.floor(Math.random() * 10)
      }
      return prefix + year + month + day + hour + minutes + num
    }
  }
}
</script>

<style lang="scss" scoped>
.encryptedString-input {
  width: 250px;
}
.encryptedString-btn {
  padding: 0 10px;
}
</style>
