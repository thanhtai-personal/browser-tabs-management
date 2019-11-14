# browsers/tabs-manager
A JS library for browser/tab management system. 

**Lastest version 1.4.0** 
**Last issue fixed: lost data when browser crash unexptected

This package help you to manage your browsers/tabs which is on your react web app. 

## How it works
```javascript
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TabManagerWrapper, TabManager } from 'window-tabs-management'
const defaultData = {
  isActive: false
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default TabManagerWrapper(App, 'my-app-key', defaultData);
```

TabManager functions support
```javascript
    import { TabManager } from 'window-tabs-management'
    let tabManager = TabManager('my-app-key')
      tabManager = {
        newTab: <<A function help you to add new tab to tabs list.>>,
        getTab: <<A function help you to get tab data from tabs list.>>,
        removeTab: <<A function help you to remove a tab to tabs list.>>,
        getTabList: <<A function help you to get tabs list data.>>,
        setTab: <<A function help you to update data of a tab.>>,
        setManagerData: <<set data with key and value>>,
        getData: <<get data with key>>,
        emit: <<emit to other tab - tab emit does not listen this message>>,
        addTabListener: <<add listener to tab to listen from emit>>,
        removeTabListener: <<remove listener to tab to listen from emit>>,
        scanInactiveTab: <<check online state od tab then remove if false>>,
        unMount: <<auto remove data if called didMount before>>,
        didMount: <<auto init listener>>
      }
      //Function Example: 
      ////newTab
        let tab = tabManager.newTab(defaultData)
      ////getTab
        let tab = tabManager.getTab(tabId)
      ////removeTab
        tabManager.removeTab(tabId)
      ////getTabList
        let tabList = tabManager.getTabList()
      ////setTab
        let tab = tabManager.setTab(tabId, { isActive: true })
      ////setManagerData
        setManagerData([{key: 'isRedirect', value: false}, {key: 'isLoggedOut', value: false}])
        //--> cannot replace tablist
      ////getData
        let data = tabManager.getData() // get all data
        let data = tabManager.getData('tabList') //get tabList - can be null or undefined
      ////emit
        tabManager.emit() // send message to other tab
        tabManager.emit('isRedirect', true) // change data and send message to other tab
      ////addTabListener
        tabManager.addTabListener(() => {
          let isRedirect = tabManager.getData('isRedirect')
          if (isRedirect) {
            window.location.replace('https://tttgalaxy.co.uk')
          }
        })
      ////removeTabListener,
        tabManager.removeTabListener(() => {
          let isRedirect = tabManager.getData('isRedirect')
          if (isRedirect) {
            window.location.replace('https://tttgalaxy.co.uk')
          }
        })
      ////scanInactiveTab,
        tabManager.scanInactiveTab(() => {
          //call back after scanned
        })
      ////unMount,
        tabManager.unMount(tabManager.getTab(tabData.id))
      ////didMount
        tabManager.didMount(tabManager.getTab(tabData.id))
```
Get more in my example: https://github.com/thanhtai-personal/tabmanager-example

That's all.

**Note.**
** TabManagerWrapper helped you to create tab data when you load your component and then remove tab data when you close your tab.
Then if you use TabManagerWrapper, you have not to do it again.**
** Better if you use TabManagerWrapper to wrap your root component. **
**Have fun.**

## Borwsers support
