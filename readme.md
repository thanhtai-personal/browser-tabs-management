# browsers/tabs-manager
A JS library for browser/tab management system. 

**From version 1.2.3** 
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

export default TabManagerWrapper(App, defaultData);
/**
     *
      let tabManager = TabManager()
      tabManager = {
        newTab: <<A function help you to add new tab to tabs list.>>
        getTab: <<A function help you to get tab data from tabs list.>>,
        removeTab: <<A function help you to remove a tab to tabs list.>>,
        getTabList: <<A function help you to get tabs list data.>>,
        setTab: <<A function help you to update data of a tab.>>
      }
      Function Example: 
      ---newTab
        let tab = this.props.tabManager.newTab(defaultData)
      ---getTab
        let tab = this.props.tabManager.getTab(tabId)
      ---removeTab
        this.props.tabManager.removeTab(tabId)
      ---getTabList
        let tabList = this.props.tabManager.getTabList()
      ---setTab
        let tab = this.props.tabManager.setTab(tabId, <<data as an object>>)
    }
    */
```
That's all of my first npm package :).

**Note.**
** TabManagerWrapper helped you to create tab data when you load your component and then remove tab data when you close your tab.
Then if you use TabManagerWrapper, you have not to do it again.**
** Better if you use TabManagerWrapper to wrap your root component. **
**Have fun.**

## Borwsers support
