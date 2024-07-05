import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  //1.动态获取所有的路由对象，放在数组中
  //从路由文件中将所有的路由对象读取到数组中
  const localRoutes: RouteRecordRaw[] = []

  //1.1读取router/main下所有的ts路由文件
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    {
      eager: true
    }
  )

  //1.2将加载的对象放在localRoutes中
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  // console.log(localRoutes)

  return localRoutes
}

/**
 * 将用户菜单数据映射为路由配置。
 *
 * 该函数接收用户权限系统中定义的菜单列表，将其转换为前端路由的配置格式。
 * 这个映射过程是必要的，因为用户菜单和前端路由在系统中是分别管理的。
 * 通过这个函数，我们可以根据用户的权限动态生成路由表，确保用户只能访问其有权访问的页面。
 *
 * @param userMenus 用户的菜单列表，包含了用户有权访问的所有菜单项。
 * @returns 返回一个路由配置数组，每个元素代表一个路由条目。
 */
export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  //1.加载本地路由
  const localRoutes = loadLocalRoutes()
  // 初始化路由配置数组，用于存储最终生成的路由配置。
  //2.根据userMenus与本地路由进行匹配
  const routes: RouteRecordRaw[] = []

  // 遍历用户菜单列表，为每个菜单项及其子菜单项生成对应的路由配置。
  for (const menu of userMenus) {
    // 遍历菜单项的子菜单列表。
    for (const submenu of menu.children) {
      // 在本地路由列表中查找与当前子菜单URL匹配的路由配置。
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 如果当前菜单项还没有对应的路由配置，则添加一个重定向配置到该菜单项。
        // 这是为了处理菜单项没有直接对应的页面，但其子菜单项有对应页面的情况。
        //给route的顶层菜单增加重定向功能到route
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        // 将找到的路由配置添加到路由配置数组中。
        // 这样做是为了确保用户有权访问的每个页面都能在路由表中找到对应的路由配置。
        //将二级路由加入路由数组中
        routes.push(route)
      }
      // 如果还没有定义firstMenu，并且当前路由是可用的，则将当前子菜单项设为第一个菜单项。
      // 这个firstMenu可能用于应用的初始导航或其他逻辑。
      if (!firstMenu && route) {
        firstMenu = submenu
      }
    }
  }
  // 返回最终生成的路由配置数组。
  return routes
}

export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (path === subMenu.url) {
        return subMenu
      }
    }
  }
}
