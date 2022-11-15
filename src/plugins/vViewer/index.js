/*
 * @Author: Null
 * @Date: 2022-08-15 07:55:25
 * @Description:
 */
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Viewer.setDefaults({
  Options: {
    inline: true,
    button: true,
    navbar: true,
    title: true,
    toolbar: true,
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    fullscreen: true,
    keyboard: true,
    url: 'data-source'
  }
})

export default Viewer
