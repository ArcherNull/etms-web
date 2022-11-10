/*
 * @Author: Null
 * @Date: 2022-06-10 10:33:59
 * @Description:用于处理德坤业务的公共方法代码
 */

const dkCommFun = {
  /**
   * @description: 用于事业部级联框的
   * @param { Array } arr 事业部的树形数组
   * @return {*}
   */
  dealBusFun (arr) {
    if (arr.length) {
      const newArr = []
      arr.forEach(ele => {
        const obj = {
          value: ele.busdivisionId,
          label: ele.busdivisionName,
          data: ele
        }
        if (ele.baseTeamVoList.length) {
          obj.children = []
          ele.baseTeamVoList.forEach(el => {
            const cobj = {
              value: el.teamId,
              label: el.teamName,
              data: el
            }
            if (el.baseProdivisionVoList.length) {
              cobj.children = []
              el.baseProdivisionVoList.forEach(e => {
                const sobj = {
                  value: e.prodivisionId,
                  label: e.prodivisionName,
                  data: e
                }
                cobj.children.push(sobj)
              })
            }
            obj.children.push(cobj)
          })
        }
        newArr.push(obj)
      })
      // console.log('newArr', newArr)
      return newArr
    } else {
      return []
    }
  }
}

export default dkCommFun
