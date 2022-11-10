/*
 * @Author: Null
 * @Date: 2022-03-29 19:09:40
 * @Description:
 */
export class CustomerFilter {
  init (params) {
    console.log('params===========', params)
    this.eGui = document.createElement('div')
    this.eGui.innerHTML =
            `<div>
                <div style="padding:5px 10px; background-color: #d3d3d3; text-align: center;">打开筛选行</div>
                <label style="padding:5px 10px;display:block;">  
                    <input type="radio" name="CustomerFilter" checked="true" id="rbAllYears" filter-checkbox="true"/> 关闭
                </label>
                <label style="padding:5px 10px;display:block;">  
                    <input type="radio" name="CustomerFilter" id="rbSince2010" filter-checkbox="true"/> 打开
                </label>
            </div>`
    this.rbAllYears = this.eGui.querySelector('#rbAllYears')
    this.rbSince2010 = this.eGui.querySelector('#rbSince2010')
    this.rbAllYears.addEventListener('change', this.onRbChanged.bind(this))
    this.rbSince2010.addEventListener('change', this.onRbChanged.bind(this))
    this.filterActive = false
    this.filterChangedCallback = params.filterChangedCallback
    this.columnApi = params.column.columnApi
  }

  onRbChanged () {
    this.filterActive = this.rbSince2010.checked
    this.filterChangedCallback()
  }

  getGui () {
    return this.eGui
  }

  doesFilterPass (params) {
    console.log('操作筛选行', params)
    return params
  }

  isFilterActive () {
    // 取消冻结列
    this.columnApi.applyColumnState({
      defaultState: { pinned: null }
    })
    return this.filterActive
  }

  // this example isn't using getModel() and setModel(),
  // so safe to just leave these empty. don't do this in your code!!!
  getModel () {
  }

  setModel () {
  }
}
