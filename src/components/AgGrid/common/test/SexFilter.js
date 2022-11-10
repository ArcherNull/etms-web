/*
 * @Author: Null
 * @Date: 2022-03-29 19:09:40
 * @Description:
 */
export class SexFilter {
  init (params) {
    console.log('params===========', params)
    this.eGui = document.createElement('div')
    this.eGui.innerHTML =
            `<div>
                <div style="padding:5px 10px; background-color: #d3d3d3; text-align: center;">男女性别</div>
                <label style="padding:5px 10px;display:block;">  
                    <input type="radio" name="SexFilter" checked="true" id="male" filter-checkbox="true"/> 男
                </label>
                <label style="padding:5px 10px;display:block;">  
                    <input type="radio" name="SexFilter" id="female" filter-checkbox="true"/> 女
                </label>
            </div>`
    this.male = this.eGui.querySelector('#male')
    this.female = this.eGui.querySelector('#female')
    this.male.addEventListener('change', this.onRbChanged.bind(this))
    this.female.addEventListener('change', this.onRbChanged.bind(this))
    this.filterActive = false
    this.filterChangedCallback = params.filterChangedCallback
    this.valueGetter = params.valueGetter
  }

  onRbChanged () {
    this.filterActive = this.male.checked
    console.log('this.male.checked', this.male.checked)
    console.log('this.female.checked', this.female.checked)

    this.filterChangedCallback()
  }

  getGui () {
    return this.eGui
  }

  doesFilterPass (params) {
    const value = this.valueGetter(params)
    console.log('this.valueGetter(params', value)
    console.log('this.filterActive', this.filterActive)
    switch (this.filterActive) {
      case '男':
        return value === '男'
      case '女':
        return value === '女'
      default :
        return true
    }
  }

  isFilterActive () {
    return this.filterActive
  }

  // this example isn't using getModel() and setModel(),
  // so safe to just leave these empty. don't do this in your code!!!
  getModel () {
  }

  setModel () {
  }
}
