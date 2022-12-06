/*
 * @Author: Null
 * @Date: 2022-12-05 15:54:11
 * @Description:
 */

/* ******************** 阶梯计价 ******************** */

// 零担单位计价
export const zeroUnitPricing = {
  label: '零担单位计价',
  field: 'zeroUnitPricing',
  disabled: false,
  id: 123,
  value: 'zeroUnitPricing',
  component: {
    type: 'select',
    defaultValue: '',
    optionsList: [
      {
        label: '重量',
        value: 'zeroUnitPricingWeight'
      },
      {
        label: '体积',
        value: 'zeroUnitPricingVolume'
      },
      {
        label: '件数',
        value: 'zeroUnitPricingNumber'
      }
    ]
  }
}

// 途径点
export const wayPoint = {
  label: '途径点',
  field: 'wayPoint',
  disabled: false,
  id: 123,
  value: 'wayPoint',
  component: {
    type: 'select',
    defaultValue: '',
    optionsList: [
      {
        label: '订单发货地址数',
        value: 'orderSendAddrNumber'
      },
      {
        label: '订单收货地址数',
        value: 'orderReceiveAddrNumber'
      },
      {
        label: '订单途径点数',
        value: 'orderWayPointNumber'
      }
    ]
  }
}

// 车长和车型
export const carTypeAndLength = {
  label: '车长车型',
  field: 'carTypeAndLength',
  disabled: false,
  id: 123,
  value: 'carTypeAndLength',
  component: {
    type: 'select',
    defaultValue: '',
    optionsList: [
      {
        label: '订单车长&车型',
        value: 'orderCarTypeAndLength'
      },
      {
        label: '运单车长&车型',
        value: 'wayCarTypeAndLength'
      }
    ]
  }
}

// 整车单位计价
export const sinCarUnitPricing = {
  label: '整车单位计价',
  field: 'sinCarUnitPricing',
  disabled: false,
  id: 123,
  value: 'sinCarUnitPricing',
  component: {
    type: 'select',
    defaultValue: '',
    optionsList: [
      {
        label: '重量',
        value: 'sinCarUnitPricingWeight'
      },
      {
        label: '体积',
        value: 'sinCarUnitPricingVolume'
      },
      {
        label: '距离',
        value: 'sinCarUnitPricingDistance'
      },
      {
        label: '吨公里',
        value: 'sinCarUnitPricingTonAddKm'
      },
      {
        label: '立方公里',
        value: 'sinCarUnitPricingCubeAndKm'
      },
      wayPoint,
      carTypeAndLength
    ]
  }
}

/* ********** 阶梯计价-零担阶梯计价 ********** */

// 零担阶梯计价-重量
export const zeroCarTiePricingWeight = {
  label: '重量',
  field: 'zeroCarTiePricingWeight',
  disabled: false,
  id: 123,
  value: 'zeroCarTiePricingWeight',
  component: {
    type: 'select',
    defaultValue: '',
    optionsList: [
      {
        label: '订单总重量',
        value: 'orderTotalWeight'
      },
      {
        label: '货物明细重量',
        value: 'goodsDetailWeight'
      },
      {
        label: '订单计费重量',
        value: 'orderBillingWeight'
      },
      {
        label: '运单重量',
        value: 'waybillWeight'
      }
    ]
  }
}

// 零担阶梯计价-体积
export const zeroCarTiePricingVolume = {
  label: '体积',
  field: 'zeroCarTiePricingVolume',
  disabled: false,
  id: 123,
  value: 'zeroCarTiePricingVolume',
  component: {
    type: 'select',
    defaultValue: '',
    optionsList: [
      {
        label: '订单总体积',
        value: 'orderTotalVolume'
      },
      {
        label: '货物明细体积',
        value: 'goodsDetailVolume'
      },
      {
        label: '订单计费体积',
        value: 'orderBillingVolume'
      },
      {
        label: '运单体积',
        value: 'waybillVolume'
      }
    ]
  }
}

// 零担阶梯计价-件数
export const zeroCarTiePricingNumber = {
  label: '件数',
  field: 'zeroCarTiePricingNumber',
  disabled: false,
  id: 123,
  value: 'zeroCarTiePricingNumber',
  component: {
    type: 'select',
    defaultValue: '',
    optionsList: [
      {
        label: '订单总件数',
        value: 'orderTotalNumber'
      },
      {
        label: '货物明细件数',
        value: 'goodsDetailNumber'
      },
      {
        label: '运单件数',
        value: 'waybillNumber'
      }
    ]
  }
}

// 零担阶梯计价
export const zeroCarTiePricing = {
  label: '零担阶梯计价',
  field: 'zeroCarTiePricing',
  disabled: false,
  id: 123,
  value: 'TiePricing',
  component: {
    type: 'select',
    defaultValue: '',
    optionsList: [
      zeroCarTiePricingWeight,
      zeroCarTiePricingVolume,
      zeroCarTiePricingNumber
    ]
  }
}

/* ********** 阶梯计价-零担阶梯计价 ********** */

/* ********** 阶梯计价-整车阶梯计价 ********** */
// 重量
export const sinCarTiePricingWeight = {
  label: '重量',
  value: 'sinCarTiePricingWeight'
}

// 体积
export const sinCarTiePricingVolume = {
  label: '体积',
  value: 'sinCarTiePricingVolume'
}

// 距离
export const sinCarTiePricingDistance = {
  label: '距离',
  field: 'sinCarTiePricingDistance',
  disabled: false,
  id: 123,
  value: 'sinCarTiePricingDistance',
  component: {
    type: 'select',
    defaultValue: '',
    optionsList: [
      sinCarTiePricingStaDistance,
      sinCarTiePricingGPSDistance
    ]
  }
}

// 距离-标准距离
export const sinCarTiePricingStaDistance = {
  label: '标准距离',
  disabled: false,
  value: 'sinCarTiePricingStaDistance'
}

// 距离-GPS距离
export const sinCarTiePricingGPSDistance = {
  label: 'GPS距离',
  disabled: false,
  value: 'sinCarTiePricingGPSDistance'
}

// 吨公里
export const tonAddKm = {
  label: '吨公里',
  field: 'tonAddKm',
  disabled: false,
  id: 123,
  value: 'tonAddKm',
  component: {
    type: 'select',
    defaultValue: '',
    optionsList: [
      sinCarTiePricingDistance,
      zeroCarTiePricingWeight
    ]
  }
}

// 立方公里
export const cubeAndKm = {
  label: '立方公里',
  field: 'cubeAndKm',
  disabled: false,
  id: 123,
  value: 'cubeAndKm',
  component: {
    type: 'select',
    defaultValue: '',
    optionsList: [
      sinCarTiePricingDistance,
      zeroCarTiePricingVolume
    ]
  }
}

// 整车阶梯计价
export const sinCarTiePricing = {
  label: '整车阶梯计价',
  field: 'sinCarTiePricing',
  disabled: false,
  id: 123,
  value: 'TiePricing',
  component: {
    type: 'select',
    defaultValue: '',
    optionsList: [
      sinCarTiePricingWeight,
      sinCarTiePricingVolume,
      sinCarTiePricingDistance,
      tonAddKm,
      cubeAndKm
    ]
  }
}

/* ********** 阶梯计价-整车阶梯计价 ********** */
// 阶梯计价
export const TiePricing = {
  label: '阶梯计价',
  field: 'TiePricing',
  disabled: false,
  id: 123,
  value: 'TiePricing',
  component: {
    type: 'select',
    defaultValue: '',
    optionsList: [zeroCarTiePricing, sinCarTiePricing]
  }
}

// 单位计价
export const unitPricing = {
  label: '单位计价',
  field: 'unitPricing',
  disabled: false,
  id: 123,
  value: 'unitPricing',
  component: {
    type: 'select',
    defaultValue: '',
    optionsList: [
      zeroUnitPricing,
      sinCarUnitPricing
    ]
  }
}

// 基础规则
export const baseRules = {
  label: '基础规则',
  field: 'baseRules',
  disabled: false,
  id: 123,
  value: 'baseRules',
  component: {
    type: 'select',
    defaultValue: '',
    optionsList: [unitPricing, TiePricing]
  }
}

/* ******************** 阶梯计价 ******************** */

// 基础规则
export const multiRules = {
  label: '组合规则',
  field: 'multiRules',
  disabled: false,
  id: 123,
  value: 'multiRules',
  component: {
    type: 'select',
    defaultValue: '',
    optionsList: [
      {
        label: '重量&体积',
        value: 'weightAndVolume'
      },
      {
        label: '重量&件数',
        value: 'weightAndNumber'
      },
      {
        label: '体积&件数',
        value: 'volumeAndNumber'
      },
      {
        label: '距离&途径点',
        value: 'distanceAndWayPoint'
      },
      {
        label: '吨公里&途径点',
        value: 'tonAddKmAndWayPoint'
      },
      {
        label: '立方公里&途径点',
        value: 'cubeAndKmAndWayPoint'
      },
      {
        label: '吨公里&立方公里',
        value: 'tonAddKmAndCubeAndKm'
      }
    ]
  }
}

export const billingRules = {
  label: '计费规则',
  field: 'billingRules',
  disabled: false,
  id: 123,
  loading: true,
  required: true,
  rules: [
    { required: true, message: '请选择计费规则', trigger: 'blur' }
  ],
  helpMessage: '123123',
  component: {
    type: 'select',
    defaultValue: '',
    optionsList: [baseRules, multiRules]
  }
}

export const billingRulesTree = {
  billingRules: {
    baseRules: {
      unitPricing: {
        zeroUnitPricing: {
          zeroUnitPricingWeight: false,
          zeroUnitPricingVolume: false,
          zeroUnitPricingNumber: false
        },
        sinCarUnitPricing: {
          sinCarUnitPricingWeight: false,
          sinCarUnitPricingVolume: false,
          sinCarUnitPricingDistance: false,
          sinCarUnitPricingTonAddKm: false,
          sinCarUnitPricingCubeAndKm: false,
          wayPoint: {
            orderSendAddrNumber: false,
            orderReceiveAddrNumber: false,
            orderWayPointNumber: false
          },
          carTypeAndLength: {
            orderCarTypeAndLength: false,
            wayCarTypeAndLength: false
          }
        }
      },
      tiePricing: {
        zeroCarTiePricing: {
          zeroCarTiePricingWeight: {
            orderTotalWeight: true,
            goodsDetailWeight: true,
            orderBillingWeight: true,
            waybillWeight: true
          },
          zeroCarTiePricingVolume: {
            orderTotalVolume: true,
            goodsDetailVolume: true,
            orderBillingVolume: true,
            waybillVolume: true
          },
          zeroCarTiePricingNumber: {
            orderTotalNumber: true,
            goodsDetailNumber: true,
            waybillNumber: true
          }
        },
        sinCarTiePricing: {
          sinCarTiePricingWeight: true,
          sinCarTiePricingVolume: true,
          sinCarTiePricingDistance: {
            sinCarTiePricingStaDistance: true,
            sinCarTiePricingGPSDistance: true
          },
          tonAddKm: {
            sinCarTiePricingDistance: true,
            zeroCarTiePricingWeight: true
          },
          cubeAndKm: {
            sinCarTiePricingDistance: true,
            zeroCarTiePricingVolume: true
          }
        }
      }
    },
    multiRules: {
      weightAndVolume: false,
      weightAndNumber: false,
      volumeAndNumber: false,
      distanceAndWayPoint: false,
      tonAddKmAndWayPoint: false,
      cubeAndKmAndWayPoint: false,
      tonAddKmAndCubeAndKm: false
    }
  }
}
