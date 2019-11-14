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
      this.tabManager.didMount(this.tabManager.getTab(this.tabManager.id))
    }

    componentWillUnmount () {
      this.tabManager.unMount(this.tabManager.getTab(this.tabManager.id))
    }

    render () {
      return (<ComposedComponent tabData={this.tabData} tabManager={this.tabManager} {...this.props} />)
    }
  }

  return TabManagerWrapperComponent
}

