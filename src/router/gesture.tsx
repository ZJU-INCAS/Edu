import history from '@/utils/history'

/**
 * 全局手势滑动
 *
 * TODO: 动画效果
 */

const globalBack = {
  clientX: 0,
  clientY: 0,
}

document.addEventListener(
  'touchstart',
  (event: TouchEvent) => {
    globalBack.clientX = event.changedTouches[0].clientX
    globalBack.clientY = event.changedTouches[0].clientY
  },
  false
)

document.addEventListener(
  'touchend',
  (event: TouchEvent) => {
    const moveX = event.changedTouches[0].clientX - globalBack.clientX
    const moveY = event.changedTouches[0].clientY - globalBack.clientY

    if (Math.abs(moveY) > 40) {
      return
    }

    if (moveX > 150) {
      history.go(-1)
    }
    if (moveX < -150) {
      history.go(1)
    }
  },
  false
)
