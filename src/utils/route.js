import path from 'path'

const isNull = (data) => {
  if (!data || JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]') return true
}

/**
 * 返回所有子路由
 */
const getChildrenRoutes = (routes) => {
  const results = []
  routes.forEach((route) => {
    if (!isNull(route.children)) {
      results.push(...route.children)
    }
  })
  return results
}

/* 过滤脱离层级的路由 */
export const filterRouters = (routes) => {
  const childrenRoutes = getChildrenRoutes(routes)
  console.log('childrenRoutes', childrenRoutes)
  return routes.filter((route) => !childrenRoutes.find(item => item.path === route.path))
}

export const generateMenus = (routes, basePath = '') => {
  const results = []
  routes.forEach((route) => {
    if (isNull(route.children) && isNull(route.meta)) return
    if (!isNull(route.children) && isNull(route.meta)) {
      results.push(...generateMenus(route.children, ''))
    }

    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, route.path) // ??
    // console.log('routePath', basePath, route.path, routePath)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let curRoute = results.find(item => item.path === routePath) // ??
    // console.log('curRoute', curRoute)
    if (!curRoute) {
      curRoute = {
        ...route,
        path: routePath,
        children: []
      }

      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
      // meta 存在生成 route 对象，放入 arr
        results.push(curRoute)
      }
    }

    // 存在 children 进入迭代到children
    if (route.children) {
      curRoute.children.push(...generateMenus(route.children, route.path))
    }
  })

  return results
}
