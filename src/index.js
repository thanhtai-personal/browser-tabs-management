import React, { PureComponent } from 'react'
import tabManagement from './tabManager'

export const TabManager = tabManagement

export const TabManagerWrapper = (ComposedComponent, appKey, tabData) => {
  class TabManagerWrapperComponent extends PureComponent {
    constructor (props) {
      super(props)
      this.tabManager = tabManagement(appKey)
      this.tabData = this.tabManager.newTab(tabData || {})
    }

    componentDidMount () {
      window.addEventListener('beforeunload', () => {
        this.tabManager.removeTab(this.tabData.id)
      })
    }

    componentWillUnmount () {
      window.removeEventListener('beforeunload', () => {
        this.tabManager.removeTab(this.tabData.id)
      })
    }

    render () {
      return (<ComposedComponent tabData={this.tabData} tabManager={this.tabManager} {...this.props} />)
    }
  }

  return TabManagerWrapperComponent
}

