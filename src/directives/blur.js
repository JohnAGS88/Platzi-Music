const blur = {}

function setBlur (el, binding) {
  el.style.filter = !binding.value ? 'blur(3px)' : 'none'
  el.style.cursor = !binding.value ? 'not-allowed' : 'inheret'

  el.querySelectorAll('a').forEach(a => {
    if (!binding.value) {
      a.setAttribute('disable', true)
    } else {
      a.removeAttribute('disable')
    }
  })
}
blur.install = function (Vue) {
  Vue.directive('blur', {
    bind (el, binding) {
      setBlur(el, binding)
    }
  })
}
export default blur
