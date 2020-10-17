import VideoDanmu from '../js/danmu'

const danmuData = [
  {
    content: '不错哦',
    speed: 2,
    runTime: 0,
    color: 'red'
  }, {
    content: '666666666666666',
    speed: 3,
    runTime: 5,
    color: 'orange'
  }, {
    content: '挺好看的挺好看的挺好看的挺好看的挺好看的挺好看的',
    speed: 1,
    runTime: 8,
    color: 'green'
  }
]

// 防止打包出现问题
;((doc) => {
  // 获取节点实例
  const oDanmuVideo = doc.getElementById('J_danmuVideo'),
        oDanmuCanvas = doc.getElementById('J_danmuCanvas'),
        oDanmuInput = doc.getElementsByClassName('danmu-input')[0],
        oDanmBtn = doc.getElementsByClassName('danmu-btn')[0],
        oColorInput = doc.getElementsByClassName('color-input')[0],
        oRangeInput = doc.getElementsByClassName('range-input')[0],
        oRangeSpan = doc.getElementsByClassName('range-span')[0]

  // 初始化函数
  const init = () => {
    // 实例化弹幕插件
    window.videoDanmu = new VideoDanmu(
      oDanmuVideo,
      oDanmuCanvas,
      {
        danmuData
      }
    )

    bindEvent()
  }

  // 绑定事件处理函数
  function bindEvent () {
    oDanmuVideo.addEventListener('play', handleVideoPlay, false)
    oDanmuVideo.addEventListener('pause', handleVideoPause, false)
    oDanmuVideo.addEventListener('seeked', handleVideoSeeked, false)
    oDanmBtn.addEventListener('click', handleDanmuBtnClick, false)
    oRangeInput.addEventListener('change', handleRangeChange, false)
  }

  function handleVideoPlay () {
    videoDanmu.danmuPaused = false
    videoDanmu.render()
  }

  function handleVideoPause () {
    videoDanmu.danmuPaused = true
  }

  function handleVideoSeeked () {
    videoDanmu.reset()
  }

  function handleDanmuBtnClick () {
    if (videoDanmu.danmuPaused) return

    const inputValue = oDanmuInput.value.trim()

    if (!inputValue.length) return

    const colorValue = oColorInput.value,
          currentTime = oDanmuVideo.currentTime,
          fontSizeValue = oRangeInput.value

    const _data = {
      content: inputValue,
      color: colorValue,
      runTime: currentTime,
      fontSize: fontSizeValue
    }

    videoDanmu.addDanmu(_data)
    oDanmuInput.value = ''
  }

  function handleRangeChange () {
    const rangeValue = oRangeInput.value
    oRangeSpan.innerText = rangeValue
  }

  init()

})(document)