import React, { PureComponent } from 'react'
import tabManagement from './tabManager'

export const TabManager = tabManagement

export const TabManagerWrapper = (ComposedComponent, tabData) => {
  class TabManagerWrapperComponent extends PureComponent {
    constructor (props) {
      super(props)
      this.tabManager = tabManagement()
      this.tabData = this.tabManager.newTab(tabData || {})
    }

    componentDidMount () {
      window.addEventListener('onbeforeunload', () => {
        this.tabManager.removeTab(this.tabData.id)
      })
    }

    componentWillUnmount () {
      window.removeEventListener('onbeforeunload', () => {
        this.tabManager.removeTab(this.tabData.id)
      })
    }

    render () {
      return (<ComposedComponent tabData={this.tabData} tabManager={this.tabManager} {...this.props} />)
    }
  }

  return TabManagerWrapperComponent
}

