const TabManagement = (appKey) => {

  const scanTime = 3000

  const onlineState = {
    inactive: 'inactive',
    active: 'active'
  }

  const dataKeys = {
    tabsManagement: `tabs-management-${appKey}`,
    privateKeys: ['id'],
    updatedTime: 'updatedTime',
    tabPrefix: 'npm-windows-tab',
    isOnline: 'isOnline',
    isScan: 'isScan',
    tabScan: 'tabScan'
  }

  const privateDataKey = [dataKeys.isOnline]

  const getData = (key) => {
    let managerData = JSON.parse(window.localStorage.getItem(dataKeys.tabsManagement))
    if (managerData && key) {
      return managerData[key]
    }
    return managerData
  }


  const setManagerData = (listData, callBack) => {
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
    typeof callBack === 'function' && callBack()
    return tabManagerData
  }

  const getTabList = () => {
    let tabList = []
    Object.keys(window.localStorage).forEach((key) => {
      if (key.includes(dataKeys.tabPrefix)) {
        tabList.push(JSON.parse(window.localStorage.getItem(key)))
      }
    })
    return tabList
  }

  const emit = (key, value) => {
    if (key) {
      setManagerData([{ key: key, value: value || '' }])
    } else {
      setManagerData([{ key: dataKeys.updatedTime, value: new Date() }])
    }
  }

  const addTabListener = (callBack) => {
    let onStorage = typeof callBack === 'function' ? (event) => {
      callBack(event)
    } : () => {
      console.log('====Received message with no action')
    }
    window.addEventListener('storage', onStorage)
  }

  const removeTabListener  = (callBack) => {
    let onStorage = typeof callBack === 'function' ? (event) => {
      callBack(event)
    } : () => {
      console.log('====Received message with no action')
    }
    window.removeEventListener('storage', onStorage)
  }

  const getNow = () => {
    let now = new Date()
    let date = `${now.getFullYear().toString()}_${(now.getMonth() + 1)}_${now.getDate()}`
    let time = `${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}_${now.getMilliseconds()}`
    return {
      value: now,
      valueString: `${date}_${time}`
    }
  }


  const removeTab = (id, callBack) => {
    window.localStorage.removeItem(id)
    typeof callBack === 'function' && callBack()
  }

  const getTab = (id) => {
    return JSON.parse(window.localStorage.getItem(id))
  }

  const setTab = (id, data, callBack) => {
    let tab = getTab(id) || {}
    data.forEach((dat) => {
      if (!dataKeys.privateKeys.includes(dat.key)) {
        tab[dat.key] = dat.value
      }
    })
    window.localStorage.setItem(tab.id, JSON.stringify(tab))
    typeof callBack === 'function' && callBack()
    return tab
  }

  const scanInactiveTab = (callBack) => {
    let tabList = getTabList()
    let tabId = getData(dataKeys.tabScan)
    tabList.forEach(tab => {
      setTab(tab.id, [{ key: dataKeys.isOnline, value: onlineState.inactive }])
    })
    setManagerData([{ key: dataKeys.isScan, value: true }])
    setTimeout(() => {
      tabList = getTabList()
      tabList.forEach((tab) => {
        if (tab[dataKeys.isOnline] === onlineState.inactive
          && tab.id !== tabId
          ) {
          removeTab(tab.id)
        } else {
          setTab(tab.id, [{ key: dataKeys.isOnline, value: true }])
        }
      })
      typeof callBack === 'function' && callBack()
      setManagerData([{ key: dataKeys.isScan, value: false }])
    }, scanTime)
  }

  

  const newTab = (data , callBack) => {
    let tabData = {
      id: `${dataKeys.tabPrefix}_${getNow().valueString}`,
      isOnline: true
    }
    if (data && typeof data === 'object') {
      Object.keys(data).forEach((key) => {
        if (!dataKeys.privateKeys.includes(key)) tabData[key] = data[key]
      })
    }
    window.localStorage.setItem(tabData.id, JSON.stringify(tabData))
    setManagerData([{ key: dataKeys.tabScan, value: tabData.id }])
    setTimeout(() => {
      scanInactiveTab()
    }, 500)
    typeof callBack === 'function' && callBack()
    return tabData
  }

  const unMount = (tabData) => {
    window.removeEventListener('beforeunload', () => {
      removeTab(tabData.id)
    })
    removeTabListener((event) => {
      let oldValue = {}, newValue = {} 
      try {
        oldValue = e.oldValue ? JSON.parse(e.oldValue) : {}
      } catch (error) {
        oldValue = e.oldValue
      }
      try {
        newValue = e.newValue ? JSON.parse(e.newValue) : {}
      } catch (error) {
        newValue = e.newValue
      }
      if (event.key === dataKeys.tabsManagement) {
        if (oldValue[dataKeys.isScan] !== newValue[dataKeys.isScan]
           && getData(dataKeys.isScan)
          ) {
          setTab(tabData.id, [{ key: dataKeys.isOnline, value: onlineState.active }])
        }
      }
    })
  }

  const didMount = (tabData) => {
    window.addEventListener('beforeunload', () => {
      removeTab(tabData.id)
    })
    addTabListener((event) => {
      let oldValue = {}, newValue = {} 
      try {
        oldValue = e.oldValue ? JSON.parse(e.oldValue) : {}
      } catch (error) {
        oldValue = e.oldValue
      }
      try {
        newValue = e.newValue ? JSON.parse(e.newValue) : {}
      } catch (error) {
        newValue = e.newValue
      }
      if (event.key === dataKeys.tabsManagement) {
        if (oldValue[dataKeys.isScan] !== newValue[dataKeys.isScan]
           && getData(dataKeys.isScan)
          ) {
          setTab(tabData.id, [{ key: dataKeys.isOnline, value: onlineState.active }])
        }
      }
    })
  }

  return {
    newTab,
    getTab,
    removeTab,
    getTabList,
    setTab,
    setManagerData,
    getData,
    emit,
    addTabListener,
    removeTabListener,
    scanInactiveTab,
    unMount,
    didMount
  }
}

export default TabManagement