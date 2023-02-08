export default function ({ app }) {
  try {
    const dark = localStorage.getItem('dark')
    if (!dark) {
      //SET DEFAULT OF THEME WHEN DELETE OR REMOVE BY USER
      localStorage.setItem('dark', true)
    } else {
      const listThemeBoolean = ['true', 'false']
      if (!listThemeBoolean.includes(dark)) {
        console.log(`log now`, dark)
        localStorage.setItem('dark', true)
      } else {
      }
    }
  } catch (e) {
    console.error(e)
  }
}
