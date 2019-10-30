const TabManagement = (appKey) => {

  const errorString = {
    tabNotFound: 'tab not found!',
    removeFailed: 'Remove failed'
  }

  const dataKeys = {
    tabsManagement: `tabs-management-${appKey}`,
    privateKeys: ['id'],
    tabList: 'tabList',
    updatedTime: 'updatedTime'
  }

  const privateDataKey = [dataKeys.tabList]

  const getData = (key) => {
    let managerData = JSON.parse(window.localStorage.getItem(dataKeys.tabsManagement))
    if (managerData && key) {
      return managerData[key]
    }
    return managerData
  }


  const setManagerData = (listData) => {
    let tabManagerData = getData()
    if (!tabManagerData) {
      tabManagerData = {}
    }
    listData.forEach((data) => {
      if (!privateDataKey.includes(data.key)) {
        tabManagerData[data.key] = data.value
      }
    })
    window.localStorage.setItem(dataKeys.tabsManagement, JSON.stringify(tabManagerData))
    return tabManagerData
  }

  const getTabList = () => {
    return getData(dataKeys.tabList) || []
  }

  const setTabList = (data) => {
    let tabManagerData = getData()
    if (!tabManagerData) {
      tabManagerData = {}
    }
    tabManagerData[dataKeys.tabList] = data || []
    window.localStorage.setItem(dataKeys.tabsManagement, JSON.stringify(tabManagerData))
  }

  const newTab = (data) => {
    let now = new Date()
    let date = `${now.getFullYear().toString()}_${(now.getMonth() + 1)}_${now.getDate()}`
    let time = `${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}_${now.getMilliseconds()}`
    let tabData = {
      id: `tab_id_${date}_${time}`
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

  const emit = (key, value) => {
    if (key) {
      setManagerData([{ key: key, value: value || '' }])
    } else {
      setManagerData([{ key: dataKeys.updatedTime, value: new Date() }])
    }
  }

  const addTabListener = (callBack) => {
    window.addEventListener('storage', typeof callBack === 'function' ? (event) => { 
      callBack(event)
    } : () => {
        console.log('====Received message with no action')
      }
    )
  }

  return {
    newTab: newTab,
    getTab: getTab,
    removeTab: removeTab,
    getTabList: getTabList,
    setTab: setTab,
    setManagerData: setManagerData,
    getData: getData,
    emit: emit,
    addTabListener: addTabListener
  }
}

export default TabManagement