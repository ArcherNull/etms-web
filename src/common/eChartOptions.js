/*
 * @Author: Null
 * @Date: 2022-01-27 14:40:14
 * @Description: eChart统计图配置项数据
 */

const eChartOptions = {
  /**
   * @description: 饼图配置项数据
   * @param {*}
   * @return {*}
   */
  pieOption () {
    const option = {
      title: {
        text: '同名数量统计',
        subtext: '纯属虚构',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: ['存量', '新增']
      },
      series: [
        {
          name: '姓名',
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: [
            { name: '存量', value: 51583 },
            { name: '新增', value: 36117 }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    return option
  },

  /**
   * @description: 多饼图配置项
   * @param { 实例化的地图对象 } chart
   * @return {*}
   */
  multiPieOption (chart) {
    const datas = [
      [
        { name: '存量', value: 5.6 },
        { name: '新增', value: 100 }
      ],
      [
        { name: '零担', value: 38 },
        { name: '整车', value: 240 }
      ]
    ]
    const option = {
      series: datas.map(function (data, idx) {
        var top = idx * 50
        return {
          type: 'pie',
          radius: [40, 60],
          top: top + 10 + '%',
          height: '33.33%',
          left: 'center',
          width: 300,
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          },
          label: {
            alignTo: 'edge',
            // formatter: '{name|{b}}\n{time|{c} 小时}',
            formatter: '{name|{b}} : {value|{c}} \n{percentage|{d}%}',
            minMargin: 5,
            edgeDistance: 10,
            lineHeight: 15,
            distanceToLabelLine: 5,
            rich: {
              name: {
                fontSize: 16,
                color: '#666666',
                lineHeight: 24
              },
              value: {
                fontSize: 18,
                color: '#333333',
                fontWeight: 'bold',
                lineHeight: 24
              },
              percentage: {
                fontSize: 18,
                color: 'red',
                lineHeight: 24,
                minMargin: 4,
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            length: 15,
            length2: 0,
            maxSurfaceAngle: 80
          },
          labelLayout: function (params) {
            const isLeft = params.labelRect.x < chart.getWidth() / 2
            const points = params.labelLinePoints
            // Update the end point.
            points[2][0] = isLeft
              ? params.labelRect.x
              : params.labelRect.x + params.labelRect.width
            return {
              labelLinePoints: points
            }
          },
          data: data
        }
      })
    }
    return option
  },

  /**
   * @description: 折线图配置项数据
   * @param {*}
   * @return {*}
   */
  lineOption: function () {
    const option = {
      title: {
        text: '本月营业收入',
        top: '2%',
        left: '50%',
        textAlign: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['运营', '合伙人', '平台'],
        left: 'center',
        bottom: '1%',
        textAlign: 'center'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '7%',
        containLabel: true
      },
      toolbox: {
        right: 30,
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['3-1', '3-2', '3-3', '3-4', '3-5', '3-6', '3-7']
      },
      yAxis: {
        type: 'value',
        nameTextStyle: {
          color: '#333333',
          fontSize: 14,
          fontWeight: 'bold'
        },
        name: '单位：万元' // 坐标轴名称
      },
      series: [
        {
          name: '运营',
          type: 'line',
          stack: 'Total',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '合伙人',
          type: 'line',
          stack: 'Total',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '平台',
          type: 'line',
          stack: 'Total',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    }
    return option
  },

  /**
   * @description: 柱状图配置项数据
   * @param {*}
   * @return {*}
   */
  barOption: function () {
    const that = this
    var app = {} // 可以设置的对象

    var posList = [
      'left',
      'right',
      'top',
      'bottom',
      'inside',
      'insideTop',
      'insideLeft',
      'insideRight',
      'insideBottom',
      'insideTopLeft',
      'insideTopRight',
      'insideBottomLeft',
      'insideBottomRight'
    ]

    app.configParameters = {
      rotate: {
        min: -90,
        max: 90
      },
      align: {
        options: {
          left: 'left',
          center: 'center',
          right: 'right'
        }
      },
      verticalAlign: {
        options: {
          top: 'top',
          middle: 'middle',
          bottom: 'bottom'
        }
      },
      position: {
        options: posList.reduce(function (map, pos) {
          map[pos] = pos
          return map
        }, {})
      },
      distance: {
        min: 0,
        max: 100
      }
    }

    app.config = {
      rotate: 1,
      align: 'center',
      verticalAlign: 'middle',
      position: 'top',
      distance: 10,
      onChange: function () {
        var labelOption = {
          normal: {
            rotate: app.config.rotate,
            align: app.config.align,
            verticalAlign: app.config.verticalAlign,
            position: app.config.position,
            distance: app.config.distance
          }
        }
        that.chart.setOption({
          // 设置四列数据
          series: [
            {
              label: labelOption
            },
            {
              label: labelOption
            },
            {
              label: labelOption
            },
            {
              label: labelOption
            }
          ]
        })
      }
    }

    /* 柱状图名称 */
    var labelOption = {
      show: true, // 开关显示和隐藏
      position: app.config.position,
      distance: app.config.distance,
      align: app.config.align,
      verticalAlign: app.config.verticalAlign,
      rotate: app.config.rotate,
      formatter: '{c}', // '{c}  {name|{a}}'， {c}表示的是数据，{name|{a}}表示的是对应的数据名称，之间的空格可以展示出来
      fontSize: 12,
      rich: {
        name: {}
      }
    }

    const optionData = {
      title: {
        text: '柱状图数据',
        top: '2%',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        bottom: '2%',
        left: 'center',
        data: ['整车', '零担']
      },
      toolbox: {
        // 侧边的工具栏
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: {
            show: true,
            type: ['line', 'bar', 'tiled'] //, 'stack'
          },
          //   restore: { show: true }, // 重置option刷新
          saveAsImage: { show: true }
        }
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['2012', '2013', '2014', '2015', '2016'] // resxAxis
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '整车',
          type: 'bar',
          barGap: 0,
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [20, 432, 101, 830, 190]
        },
        {
          name: '零担',
          type: 'bar',
          barGap: 0,
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [320, 332, 301, 334, 390]
        }
      ]
    }

    return optionData
  },

  /**
   * @description: 中国地图[地域筛选]配置项数据
   * @param {*}
   * @return {*}
   */
  chinaMapAreaOption () {
    const randomData = () => {
      return Math.round(Math.random() * 500)
    }
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '月降雨量 <br/>{b} : {c}L'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['']
      },
      visualMap: {
        min: 0,
        max: 1000,
        left: '10%',
        top: 'bottom',
        text: ['高', '低'],
        calculable: true,
        color: ['#158BFE', '#ffffff']
      },
      selectedMode: 'single',
      series: [
        {
          name: '',
          type: 'map',
          mapType: 'china',
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          showLegendSymbol: true,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          data: [
            { name: '北京', value: randomData() },
            { name: '天津', value: randomData() },
            { name: '上海', value: randomData() },
            { name: '重庆', value: randomData() },
            { name: '河北', value: randomData() },
            { name: '河南', value: randomData() },
            { name: '云南', value: randomData() },
            { name: '辽宁', value: randomData() },
            { name: '黑龙江', value: randomData() },
            { name: '湖南', value: randomData() },
            { name: '安徽', value: randomData() },
            { name: '山东', value: randomData() },
            { name: '新疆', value: randomData() },
            { name: '江苏', value: randomData() },
            { name: '浙江', value: randomData() },
            { name: '江西', value: randomData() },
            { name: '湖北', value: randomData() },
            { name: '广西', value: randomData() },
            { name: '甘肃', value: randomData() },
            { name: '山西', value: randomData() },
            { name: '内蒙古', value: randomData() },
            { name: '陕西', value: randomData() },
            { name: '吉林', value: randomData() },
            { name: '福建', value: randomData() },
            { name: '贵州', value: randomData() },
            { name: '广东', value: randomData() },
            { name: '青海', value: randomData() },
            { name: '西藏', value: randomData() },
            { name: '四川', value: randomData() },
            { name: '宁夏', value: randomData() },
            { name: '海南', value: randomData() },
            { name: '台湾', value: randomData() },
            { name: '香港', value: randomData() },
            { name: '澳门', value: randomData() }
          ]
        }
      ]
    }
    return option
  },
  /**
   * @description: 中国地图[范围筛选]配置项数据
   * @param {*}
   * @return {*}
   */
  chinaMapRegionOption () {
    // 绘制图表
    const randomData = () => {
      return Math.round(Math.random() * 500)
    }
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '月降雨量 <br/>{b} : {c}L',
        rich: {
          volume: {
            fontSize: 16,
            color: '#ff0000'
          }
        }
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['']
      },
      visualMap: {
        min: 0,
        max: 1000,
        left: '10%',
        top: 'bottom',
        /*          text: ['高', '低'],
      calculable: true,
      color: ['#158BFE', '#ffffff'], */
        splitList: [
          { start: 1500, color: '#4682B4' },
          { start: 900, end: 1500, color: 'lightskyblue' },
          { start: 300, end: 1000, color: '#FF7F50' },
          { start: 200, end: 300, color: '  #FF4500' },
          {
            start: 50,
            end: 200,
            color: 'lightcoral',
            label: '10 到 200（想念暴雨）'
          },
          { start: 0, end: 50, label: '<50 干巴巴', color: 'darkred' }
        ]
      },
      selectedMode: 'single',
      series: [
        {
          name: '',
          type: 'map',
          mapType: 'china',
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          showLegendSymbol: true,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          data: [
            { name: '北京', value: randomData() },
            { name: '天津', value: randomData() },
            { name: '上海', value: randomData() },
            { name: '重庆', value: randomData() },
            { name: '河北', value: randomData() },
            { name: '河南', value: randomData() },
            { name: '云南', value: randomData() },
            { name: '辽宁', value: randomData() },
            { name: '黑龙江', value: randomData() },
            { name: '湖南', value: randomData() },
            { name: '安徽', value: randomData() },
            { name: '山东', value: randomData() },
            { name: '新疆', value: randomData() },
            { name: '江苏', value: randomData() },
            { name: '浙江', value: randomData() },
            { name: '江西', value: randomData() },
            { name: '湖北', value: randomData() },
            { name: '广西', value: randomData() },
            { name: '甘肃', value: randomData() },
            { name: '山西', value: randomData() },
            { name: '内蒙古', value: randomData() },
            { name: '陕西', value: randomData() },
            { name: '吉林', value: randomData() },
            { name: '福建', value: randomData() },
            { name: '贵州', value: randomData() },
            { name: '广东', value: randomData() },
            { name: '青海', value: randomData() },
            { name: '西藏', value: randomData() },
            { name: '四川', value: randomData() },
            { name: '宁夏', value: randomData() },
            { name: '海南', value: randomData() },
            { name: '台湾', value: randomData() },
            { name: '香港', value: randomData() },
            { name: '澳门', value: randomData() }
          ]
        }
      ]
    }
    return option
  }
}

export default eChartOptions
