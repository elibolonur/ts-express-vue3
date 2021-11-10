import axios from "axios"
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router"

export const requireAuth = async (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  await axios
    .get("auth/check")
    .then(() => {
      next()
    })
    .catch(() => {
      next("/")
    })
}
