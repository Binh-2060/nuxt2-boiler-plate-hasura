const mainMixins = {
  methods: {
    changePathWithHref(path) {
      setTimeout(() => {
        window.location.href = path
      }, 1500)
    },
  },
}

export default mainMixins
