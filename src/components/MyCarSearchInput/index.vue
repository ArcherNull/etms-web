<template>
  <div class="MyCarSearchInput">
    <el-autocomplete
      v-model.trim="carNoNumber"
      popper-class="MyCarSearchInput-autocomplete"
      :fetch-suggestions="querySearch"
      :placeholder="placeholder"
      highlight-first-item
      :debounce="300"
      :loading="loading"
      @select="handleSelect"
    >
      <el-popover slot="suffix" placement="right" width="80" trigger="hover">
        <div class="carNoPrefix">
          <div class="carNoPrefix-title">
            原车牌：{{ carNoNumber || carNo }}
          </div>
          <div
            v-for="(item, index) in carPrefixList"
            :key="index"
            class="carNoPrefix-main"
          >
            {{ item }}、
          </div>
        </div>
        <i
          slot="reference"
          class="el-icon-edit el-input__icon"
          @click="editPrefix"
        />
      </el-popover>
      <template slot-scope="{ item }">
        <el-popover placement="right" width="280" trigger="hover">
          <div class="CarInfoDetail">
            <div
              v-for="(cItem, cIndex) in Object.keys(showDetailList)"
              :key="cIndex"
              class="CarInfoDetail-box"
            >
              <div class="CarInfoDetail-box__title">
                {{ showDetailList[cItem] }} :
              </div>
              <div class="CarInfoDetail-box__content">
                {{ item.data[cItem] }}
              </div>
            </div>
          </div>
          <div slot="reference" class="autoItem">
            <div class="autoItem_1">车牌号：{{ item.value }}</div>
            <div class="autoItem_2">
              主驾：{{ item.data.driverName1 }},{{ item.data.driverPhone1 }}
            </div>
          </div>
        </el-popover>
      </template>
    </el-autocomplete>
  </div>
</template>

<script>
// import { listCar } from '@/api/channel/contractCar'

export default {
  name: 'MyCarSearchInput',
  props: {
    // 车牌号
    carNo: {
      type: String,
      default: ''
    },
    // 请求体
    ajaxData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  // 车牌号的搜索下拉框， 既可搜索查询，又可以直接输入1。数据量保证在100-200范围内
  data () {
    return {
      restaurants: [],
      carNoNumber: '',
      loading: false,
      isShowAddCarBtn: false,
      showDetailList: {
        driverName1: '主驾',
        driverPhone1: '主驾电话',
        driverIdNum1: '主驾身份证',
        driverName2: '副驾',
        driverPhone2: '副驾电话',
        carState: '状态',
        carType: '类型',
        carLoad: '载重',
        carLength: '车长',
        supplierName: '承运商名称',
        cooperationType: '合作类型',
        vehicleSource: '来源',
        auditUser: '录入人',
        auditDate: '录入日期'
      },
      cb: null,
      carPrefixList: [
        '京',
        '津',
        '渝',
        '沪',
        '冀',
        '晋',
        '辽',
        '吉',
        '黑',
        '苏',
        '浙',
        '皖',
        '闽',
        '赣',
        '鲁',
        '豫',
        '鄂',
        '湘',
        '粤',
        '琼',
        '川',
        '贵',
        '云',
        '陕',
        '甘',
        '青',
        '蒙',
        '桂',
        '宁',
        '新',
        '藏'
      ],
      placeholder: '请输入内容'
    }
  },
  watch: {
    carNo: {
      handler (newVal) {
        if (newVal) {
          console.log('获取到车牌最新值', newVal)
          this.carNoNumber = newVal
          this.placeholder = newVal
        }
      },
      immediate: true,
      deep: true
    },
    ajaxData: {
      handler (newVal) {
        if (newVal) {
          if (newVal.supplierId) {
            this.carNoNumber = ''
          } else {
            if (newVal.cooperationType) {
              if (this.carNo) {
                this.carNoNumber = this.carNo
                this.listCar(this.carNo).then((res) => {
                  console.log('得到车辆列表', res)
                  this.handleSelect({
                    label: this.carNo,
                    value: this.carNo,
                    data: res[0]
                  })
                })
              } else {
                this.carNoNumber = '粤'
              }
            } else {
              this.carNoNumber = ''
            }
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    querySearch (queryString, cb) {
      this.loading = true
      this.cb = cb
      this.isShowAddCarBtn = false

      if (queryString !== undefined) {
        this.getCarList(queryString)
      } else {
        this.loading = false
        cb([])
      }
    },

    getCarList (queryString) {
      const reset = (val) => this.cb && this.cb(val)
      this.listCar(queryString)
        .then((res) => {
          console.log('获取到车辆信息', res)
          let results = []
          if (res.length) {
            results = res.map((ele) => {
              return {
                label: ele.carNo,
                value: ele.carNo,
                data: ele
              }
            })
          } else {
            results = []
            const reg =
              /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/
            if (
              reg.test(queryString) &&
              this.ajaxData.cooperationType === '临时车'
            ) {
              this.isShowAddCarBtn = true
            } else {
              this.isShowAddCarBtn = false
              // this.$emit('throwError', '')
            }
          }
          reset(results)
        })
        .catch(() => {
          reset([])
        })
        .finally(() => {
          this.loading = false
        })
    },

    handleSelect (item) {
      this.$emit('getCarNo', item)
    },
    handleIconClick (ev) {
      console.log(ev)
    },
    // 查询车辆接口
    listCar (likeField) {
      return new Promise((resolve, reject) => {
        let query = {}
        const { supplierId } = this.ajaxData
        if (supplierId) {
          if (likeField) {
            query = {
              likeField: `carNo:${likeField}`
            }
          }
          query.supplierId = supplierId
          query.pageSize = 50
        } else {
          if (!likeField) {
            reject([])
            return
          } else {
            query = {
              likeField: `carNo:${likeField}`,
              ...this.ajaxData,
              pageSize: 50
            }
          }
        }
        console.log(1111, query)

        this.listCar(query)
          .then((res) => {
            console.log('查询可用车牌号', res)
            if (res.code === 200) {
              resolve(res.data)
            }
          })
          .catch(() => {
            this.$message.warning('车辆查询失败！')
            reject(false)
          })
      })
    },
    // 编辑车辆前缀
    editPrefix () {
      console.log('编辑车辆前缀')
    }
  }
}
</script>

<style lang="scss" scoped>
.MyCarSearchInput {
  &-autocomplete {
    li {
      padding: 0 10px;
      .autoItem {
        padding: 7px 0;
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 14px;

        &_1 {
          font-size: 14px;
        }
        &_2 {
          margin-top: 4px !important;
          font-size: 12px;
          color: #b4b4b4 !important;
        }
      }
    }
  }
}

.carNoPrefix {
  font-size: 14px;
  &-title {
    color: #666;
    margin-bottom: 8px;
  }
  &-main {
    font-size: 14px;
    display: inline-block;
    color: #333;
  }
}

.CarInfoDetail {
  &-box {
    font-size: 14px;
    margin-bottom: 4px;
    display: grid;
    grid-template-columns: 100px 1fr;
    column-gap: 6px;
    &__title {
      text-align: right;
      color: #999;
    }
    &__content {
      color: #333;
    }
  }
}
</style>
