# tabs-manager-light
A JS library for browser/tab management system. 

**Version 0.0.2** 

## How it works
With plain JavaScript cast the `window-tabs-management` function with the tab's class selector as the first argument:
```javascript
import TabManagerWrapper from 'window-tabs-management'
import React from 'react'

class HelloWorld extends React.Component {
  render () {
    return 'hello world'
  }
}

export default TabManagerWrapper(HelloWorld)
```
If you want to customize the tab data:
```javascript
import TabManagerWrapper from 'window-tabs-management'
import React from 'react'

const defaultTabData = {
  name: 'hello world',
  key: 'hello world'
}

class HelloWorld extends React.Component {
  constructor (props) {
    super (props)
  }

  render () {
    console.log(this.props)
    /**
     * output is an object {
      tabData =  {
        id: <<tab_id>>,
        ...defaultTabData
      },
      tabManager = {
        newTab: <<A function help you to add new tab to tabs list.>>
        getTab: <<A function help you to get tab data from tabs list.>>,
        removeTab: <<A function help you to remove a tab to tabs list.>>,
        getTabList: <<A function help you to get tabs list data.>>,
        setTab: <<A function help you to update data of a tab.>>
      }
      Function Example: 
      ---newTab
        let tab = this.props.tabManager.newTab({})
      ---getTab
        let tab = this.props.tabManager.getTab(id)
      ---removeTab
        this.props.tabManager.removeTab(id)
      ---getTabList
        let tabList = this.props.tabManager.getTabList()
      ---setTab
        let tab = this.props.tabManager.setTab(id, data)
    }
    */
    return 'hello world'
  }
}

export default TabManagerWrapper(HelloWorld, defaultTabData)
```
That's all of my first npm package :).

**Note.**
** TabManagerWrapper helped you to create tab data when you load your component and then remove tab data when you close your tab.
Then if you use TabManagerWrapper, you have not to do it again.**
** Better if you use TabManagerWrapper to wrap your root component. **
**Have fun.**

## Borwsers support
