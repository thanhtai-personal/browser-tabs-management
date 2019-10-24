const TabManagement = () => {

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

  const newTab = (data) => {
    let tabData = {
      id: new Date()
    }
    if (data && typeof data === 'object') {
      Object.keys(data).forEach((key) => {
        if (!dataKeys.privateKeys.includes(key)) tabData[key] = data[key]
      })
    }
    let tabList = getTabList()
    tabList.push(tabData)
    window.localStorage.setItem(dataKeys.tabsManagement, JSON.stringify({ ...JSON.parse(window.localStorage.getItem(dataKeys.tabsManagement)), tabList: tabList }))
    return tabData
  }

  const removeTab = (id) => {
    let tabList = getTabList()
    let tabIndex = tabList.findIndex((tab) => tab.id === id)
    if (tabIndex >= 0) tabList.splice(tabIndex, 1)
    window.localStorage.setItem(dataKeys.tabsManagement, JSON.stringify({ ...JSON.parse(window.localStorage.getItem(dataKeys.tabsManagement)), tabList: tabList }))
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
      window.localStorage.setItem(dataKeys.tabsManagement, JSON.stringify({ ...JSON.parse(window.localStorage.getItem(dataKeys.tabsManagement)), tabList: tabList }))
    }
    return tab
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