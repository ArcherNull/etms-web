/*
 * @Author: Null
 * @Date: 2022-08-11 15:17:13
 * @Description: 用户获取服务器存储的用户个性化字段并兼容本地新增修改删除字段
 */

/**
 * @description: 本地字段兼容服务器字段的特征，并保持新增删除修改，返回新合成字段数组
 * @param {*} localData 本地字段【最新】
 * @param {*} oldServerData 服务器字段【旧版，具有特征的】
 * @return {*}
 */
export function initFieldFun (localData, oldServerData) {
  try {
    let newArr = []
    const AddNewFieldArr = []

    // 获取新字段方法
    const getNewFieldObj = (oldDataObj, localDataObj = {}) => {
      // eslint-disable-next-line no-unused-vars
      const { pinned, hide, isNew, ...resetObj } = oldDataObj
      const newObj = {
        ...resetObj,
        ...localDataObj
      }

      // 存在有固定头部的字段
      if (pinned !== 'none') {
        newObj.pinned = pinned
      }

      // 存在有固定头部的字段
      if (hide) {
        newObj.hide = true
      }

      AddNewFieldArr.push(newObj.field)

      return newObj
    }

    // 标识提示打印
    const printConsoleLog = (logText, oldDataObj, localDataObj) => {
      console.group(logText)
      oldDataObj && console.error('服务器字段', oldDataObj)
      localDataObj && console.error('本地字段', localDataObj)
      console.groupEnd()
    }

    console.log('oldServerData', oldServerData)

    // oldServerData 服务器字段不为空数组
    const oldServerDataIsNotEmpty = oldServerData && Array.isArray(oldServerData) && oldServerData.length !== 0

    if (oldServerDataIsNotEmpty) {
      const localDataLen = localData.length
      const oldServerDataLen = oldServerData.length

      // 本地字段长度大于等于服务器字段长度
      if (localDataLen >= oldServerDataLen) {
        if (localDataLen === oldServerDataLen) {
          console.log('本地字段长度等于服务器字段长度')

          for (let i = 0; i < oldServerData.length; i++) {
            const { headerName, field } =
                oldServerData[i]
            const localDataObj = localData.find(
              (ele) => ele.field === field
            )
            // 如果服务器指定字段的位置在本地还存在字段
            if (localDataObj) {
              if (
                headerName !== localDataObj.headerName &&
                  field === localDataObj.field
              ) {
                // 字段相等，但是名称不等
                // printConsoleLog(
                //   "字段相等，但是名称不等，优先取本地字段名称",
                //   oldServerData[i],
                //   localDataObj
                // );
                // 在本地字段中寻找具有相同名称的字段
                const filterItem = localData.filter(
                  (ele) => ele.headerName === headerName
                )
                if (filterItem?.length) {
                  // 可能存在多个相同名称
                  printConsoleLog(
                    '在本地字段中寻找具有相同名称的字段,当前只有一个,且不可能存在字段和名称相同的情况',
                    oldServerData[i],
                    filterItem[0]
                  )
                  newArr.push(
                    getNewFieldObj(oldServerData[i], filterItem[0])
                  )
                } else {
                  printConsoleLog(
                    '本地字段库未找到同名称字段，说明只更改了名称，但并未更字段值',
                    oldServerData[i],
                    localDataObj
                  )
                  newArr.push(
                    getNewFieldObj(oldServerData[i], localDataObj)
                  )
                }
              } else if (
                headerName === localDataObj.headerName &&
                  field !== localDataObj.field
              ) {
                // 名称相等，但是字段不等
                printConsoleLog(
                  '名称相等，但是字段不等,先查询本地是否还存在改字段',
                  oldServerData[i],
                  localDataObj
                )
                // 在本地字段中寻找具有相同字段名称的字段
                const filterItem = localData.filter(
                  (ele) => ele.field === field
                )
                if (filterItem?.length) {
                  if (filterItem.length === 1) {
                    newArr.push(
                      getNewFieldObj(oldServerData[i], filterItem)
                    )
                  } else {
                    // 可能存在多个相同字段一样，但名称不一样
                    printConsoleLog(
                      '可能存在多个相同字段一样，但名称不一样',
                      oldServerData[i],
                      filterItem
                    )
                  }
                } else {
                  printConsoleLog(
                    '本地字段库未找到，已经被删除',
                    oldServerData[i],
                    filterItem
                  )
                }

                newArr.push(localDataObj)
              } else if (
                headerName !== localDataObj.headerName &&
                  field !== localDataObj.field
              ) {
                printConsoleLog(
                  '本地字段库未找到，已经被删除',
                  oldServerData[i],
                  []
                )
              } else {
                // 找到新的字段项
                newArr.push(getNewFieldObj(oldServerData[i], localDataObj))
              }
            } else {
              printConsoleLog(
                `本地未存有该服务器字段，表示已删除本地字段或已修改/新增某字段`
              )

              // const differenceArr = diffArr(localFieldArr, AddNewFieldArr);
              const differenceArr = diffArrObj(localData, newArr)
              const {
                arrObjFiledArr1,
                arrObjFieldArr2,
                diffFieldArr,
                diffFieldObjArr
              } = differenceArr

              if (diffFieldArr?.length && diffFieldObjArr?.length) {
                printConsoleLog(
                  `本地存在修改或新增字段，${diffFieldArr}`,
                  arrObjFieldArr2,
                  arrObjFiledArr1
                )
                diffFieldObjArr.forEach((cItem) => {
                  cItem.hide = true
                  cItem.isNew = true

                  newArr.splice(cItem.colId, 0, cItem)
                })
              } else {
                printConsoleLog(`本地不存在修改或新增字段，则表示已删除`)
              }
            }
          }

          console.log('newArr', newArr)

          return newArr
        } else {
          console.log(
            '本地字段长度大于服务器字段长度，需要将新增的的字段拆分出来'
          )

          // 筛出本地新增字段，与服务器存储字段长度补齐
          const differenceArr = diffArrObj(localData, oldServerData)

          const {
            arrObj1ResetArr,
            diffFieldArr,
            arrObjFiledArr1,
            arrObjFieldArr2,
            diffFieldObjArr
          } = differenceArr

          // 过一遍本地字段数组长度和服务器字段数组长度一致的方法
          const commDataArr = initFieldFun(arrObj1ResetArr, oldServerData)
          // const commDataArr = []

          newArr = [...newArr, ...commDataArr]
          console.log('服务器字段已过滤commDataArr=====>', commDataArr)

          console.log(
            '本地额外新增字段diffFieldObjArr=====>',
            diffFieldObjArr
          )

          if (diffFieldArr?.length && diffFieldObjArr?.length) {
            printConsoleLog(
              `本地存在修改或新增字段=====>，${diffFieldArr}`,
              arrObjFieldArr2,
              arrObjFiledArr1
            )
            diffFieldObjArr.forEach((cItem) => {
              cItem.hide = true
              cItem.isNew = true

              newArr.splice(cItem.colId, 0, cItem)
            })
          } else {
            printConsoleLog(`本地不存在修改或新增字段，则表示已删除`)
          }
        }

        console.log('本地字段长度大于服务器字段长度，合并生成字段=====>newArr', newArr)
        return newArr
      } else {
        if (oldServerDataIsNotEmpty && localDataLen < oldServerDataLen) {
          // 本地字段长度小于服务器字段长度
          console.log('本地字段长度小于服务器字段长度')

          console.log('oldServerData', oldServerData)

          console.log('localData', localData)

          // 筛出本地新增字段，与服务器存储字段长度补齐
          const differenceArr = diffArrObj(oldServerData, localData)

          const {
            arrObj1ResetArr,
            arrObjFiledArr1,
            arrObjFieldArr2
          } = differenceArr

          let commDataArr = []
          if (arrObj1ResetArr.length) {
            const arrObjreLen = arrObj1ResetArr.length
            const arrObjLen1 = arrObjFiledArr1.length
            const arrObjLen2 = arrObjFieldArr2.length
            if (arrObjLen2.length - arrObjLen1.length === arrObjreLen.length) {
              // 过一遍本地字段数组长度和服务器字段数组长度一致的方法
              commDataArr = initFieldFun(localData, arrObj1ResetArr)
            } else {
              console.error('本地字段长度小于服务器字段长度,比对过后数组长度不为0，但切割后数组的长度仍然不等于本地数组长度，返回本地字段')
              commDataArr = localData
            }
          } else {
            console.error('本地字段长度小于服务器字段长度,比对过后数组长度为0，仍然不等于本地字段长度，返回本地字段')
            commDataArr = localData
          }

          console.log('本地字段长度小于服务器字段长度,服务器字段已过滤commDataArr=====>', commDataArr)
          return commDataArr
        } else {
          console.error('服务器未存放用户自定义字段数据')
          return localData
        }
      }
    } else {
      console.error('服务器未存放用户自定义字段数据')
      return localData
    }
  } catch (error) {
    console.error('合并用户服务器自定义字段数据出错，直接返回本地字段')
    return localData
  }
}

/**
   * @description: 求两个数组对象之间的差集
   * @param {*} arrObj1 求这arr1中的差集，长度要大于arr2
   * @param {*} arrObj2
   * @return {*}
   */
function diffArrObj (arrObj1, arrObj2) {
  const arrObjFiledArr1 = arrObj1.map((ele) => ele.field)
  const arrObjFieldArr2 = arrObj2.map((ele) => ele.field)

  let diffFieldObjArr = []
  const diffFieldArr = [...arrObjFiledArr1, ...arrObjFieldArr2].filter(
    (item) => {
      if (!arrObjFieldArr2.includes(item)) {
        const objItemArr = arrObj1.filter(
          (pItem) => pItem.field === item
        )
        diffFieldObjArr = [...diffFieldObjArr, ...objItemArr]
        return item
      }
    }
  )

  console.log('diffFieldArr', diffFieldArr)

  const arrObj1ResetArr = arrObj1.filter(
    (cItem) => !diffFieldArr.includes(cItem.field)
  )

  return {
    diffFieldArr, // 比对出差异的字段数组
    diffFieldObjArr, // 比对出差异的字段对象
    arrObjFiledArr1, //
    arrObjFieldArr2, //
    arrObj1ResetArr // 比对出的差值字段
  }
}

