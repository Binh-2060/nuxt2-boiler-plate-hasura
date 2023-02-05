export default function ({ store, app, redirect }) {
  if (app.$fire.auth) {
    if (store.getters.isLoggedIn) {
      return
    }
    return redirect('/login')
  }

  return redirect('/login')
}
