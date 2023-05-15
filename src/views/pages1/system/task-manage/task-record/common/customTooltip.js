/*
 * @Author: Null
 * @Date: 2022-03-30 10:22:26
 * @Description:
 */

export class CustomTooltip {
  init (params) {
    console.log('12222222===============', params)
    this.eGui = document.createElement('div')
    const color = params.color || 'white'
    const data = params.api.getDisplayedRowAtIndex(params.rowIndex).data

    this.eGui.classList.add('custom-tooltip')
    // @ts-ignore
    this.eGui.style['background-color'] = color
    this.eGui.innerHTML = `
              <p>
                  <span class="name">${params.rowIndex} 123</span>
              </p>
              <p>
                  <span>Country: </span>
                  ${data.dz}
              </p>
              <p>
                  <span>Total: </span>
                  ${data.sf}
              </p>
          `
  }

  getGui () {
    return this.eGui
  }
}
