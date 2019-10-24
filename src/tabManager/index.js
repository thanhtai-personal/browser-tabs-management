const TabManagement = () => {

  const errorString = {
    tabNotFound: 'tab not found!',
    removeFailed: 'Remove failed'
  }

  const dataKeys = {
    tabsManagement: 'tabs-management',
    privateKeys: ['id']
  }

  const getTabList = () => {
    let data = JSON.parse(window.localStorage.getItem(dataKeys.tabsManagement))
    let tabList = []
    if (data && data.tabList) {
      tabList = data.tabList
    }
    return tabList
  }

  const setTabList = (data) => {
    let tabsManagement = JSON.parse(window.localStorage.getItem(dataKeys.tabsManagement))
    if (!tabsManagement) {
      tabsManagement = {}
    }
    tabsManagement.tabList = data
    window.localStorage.setItem(dataKeys.tabsManagement, JSON.stringify(tabsManagement))
  }

  const newTab = (data) => {
    let now = new Date()
    let date = `${now.getFullYear().toString()}_${(now.getMonth() + 1)}_${now.getDate()}`
    let time = `${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}_${now.getMilliseconds()}`
    let tabData = {
      id: `${date}_${time}`
    }
    if (data && typeof data === 'object') {
      Object.keys(data).forEach((key) => {
        if (!dataKeys.privateKeys.includes(key)) tabData[key] = data[key]
      })
    }
    let tabList = getTabList()
    tabList.push(tabData)
    setTabList(tabList)
    return tabData
  }


  const removeTab = (id) => {
    let tabList = getTabList()
    let tabIndex = tabList.findIndex((tab) => tab.id === id)
    if (tabIndex >= 0) tabList.splice(tabIndex, 1)
    else console.error(`${errorString.removeFailed}-${errorString.tabNotFound}`)
    setTabList(tabList)
  } 

  const getTab = (id) => {
    return getTabList().find((tab) => tab.id === id)
  }

  const setTab = (id, data) => {
    let tabList = getTabList()
    let tabIndex = tabList.findIndex((tab) => tab.id === id)
    if (tabIndex >= 0) {
      let tab = Object.assign({}, tabList[tabIndex])
      if (data && typeof data === 'object') {
        Object.keys(data).forEach((key) => {
          if (!dataKeys.privateKeys.includes(key)) {
            tab[key] = data[key]
          }
        })
      }
      tabList[tabIndex] = tab
      setTabList(tabList)
      return tab
    }
    return
  }

  return {
    newTab: newTab,
    getTab: getTab,
    removeTab: removeTab,
    getTabList: getTabList,
    setTab: setTab
  }
}

export default TabManagement