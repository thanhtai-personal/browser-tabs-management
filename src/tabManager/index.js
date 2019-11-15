const TabManagement = (appKey) => {

  const scanTime = 3000

  const onlineState = {
    inactive: 'inactive',
    active: 'active'
  }

  const dataKeys = {
    tabsManagement: `${appKey}-tabs-management`,
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
    } : () => {}
    window.addEventListener('storage', onStorage)
  }

  const removeTabListener  = (callBack) => {
    let onStorage = typeof callBack === 'function' ? (event) => {
      callBack(event)
    } : () => {}
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

  const scanInactiveTab = (option, callBack) => {
    let tabList = getTabList()
    let tabScan = getData(dataKeys.tabScan) || []
    let tabId = tabScan !== [] ? tabScan[tabScan.length - 1] : ''
    tabList = tabList.map(tab => {
      if (tab.id !== tabId) {
        setTab(tab.id, [{ key: dataKeys.isOnline, value: onlineState.inactive }])
      } else {
        setTab(tab.id, [{ key: dataKeys.isOnline, value: onlineState.active }])
      }
      return tab
    })
    tabList.forEach((tab) => {
      setTab(tab.id, Object.keys(tab).map((key) => {
        return {
          key: key,
          value: tab[key]
        }
      }))
    })
    setManagerData([{ key: dataKeys.isScan, value: true }])
    let to = setTimeout(() => {
      tabList = getTabList()
      let lostKeyData = false
      tabList.forEach((tab) => {
        if (tab[dataKeys.isOnline] === onlineState.inactive) {
          removeTab(tab.id)
          if (option && option.isCheckLostKeyData) {
            option.keyData.forEach(
              (dat) => {
                if(tab[dat.key] === dat.value) {
                  lostKeyData = true
                }
              }
            )
          }
        } else {
          setTab(tab.id, [{ key: dataKeys.isOnline, value: true }])
        }
      })
      setManagerData([{ key: dataKeys.isScan, value: false }
      , { key: dataKeys.tabScan, value: [] } ])
      if (lostKeyData) {
        tabList = getTabList() || []
        if (tabList.length > 0) {
          setTab(tabList[0].id, option.lostData.data || [])
        }
        typeof option.callBack === 'function' && option.callBack()
      }
      typeof callBack === 'function' && callBack(getTabList())
      clearTimeout(to)
    }, scanTime)
  }

  

  const newTab = (data, callBack) => {
    let tabData = {
      id: `${appKey}_${dataKeys.tabPrefix}_${getNow().valueString}`,
      isOnline: true
    }
    if (data && typeof data === 'object') {
      Object.keys(data).forEach((key) => {
        if (!dataKeys.privateKeys.includes(key)) tabData[key] = data[key]
      })
    }
    window.localStorage.setItem(tabData.id, JSON.stringify(tabData))
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
        oldValue = event.oldValue ? JSON.parse(event.oldValue) : {}
      } catch (error) {
        oldValue = event.oldValue
      }
      try {
        newValue = event.newValue ? JSON.parse(event.newValue) : {}
      } catch (error) {
        newValue = event.newValue
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

  const didMount = (tabData, option) => {
    window.addEventListener('beforeunload', () => {
      removeTab(tabData.id)
    })
    addTabListener((event) => {
      let oldValue = {}, newValue = {} 
      try {
        oldValue = event.oldValue ? JSON.parse(event.oldValue) : {}
      } catch (error) {
        oldValue = event.oldValue
      }
      try {
        newValue = event.newValue ? JSON.parse(event.newValue) : {}
      } catch (error) {
        newValue = event.newValue
      }
      if (event.key === dataKeys.tabsManagement) {
        if (oldValue[dataKeys.isScan] !== newValue[dataKeys.isScan]
           && getData(dataKeys.isScan)
          ) {
          setTab(tabData.id, [{ key: dataKeys.isOnline, value: onlineState.active }])
        }
      }
    })
    if (getData(dataKeys.isScan)) {
      setTab(tabData.id, [{ key: dataKeys.isOnline, value: onlineState.active }])
    } else {
      let tabScan = getData(dataKeys.tabScan) || []
      tabScan.push(tabData.id)
      setManagerData([{ key: dataKeys.tabScan, value: tabScan }])
      tabScan = getData(dataKeys.tabScan) || []
      if (!_.isEmpty(tabScan) && tabData.id === tabScan[tabScan.length - 1]) {
        scanInactiveTab(option.scanData || {})
      }
    }
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
    didMount,
    dataKeys
  }
}

export default TabManagement

