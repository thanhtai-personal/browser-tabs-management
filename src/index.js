import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import TabManager from './tabManager'

const TabManagerWrapper = (ComposedComponent, tabData) => {
  class TabManagerWrapperComponent extends PureComponent {
    constructor (props) {
      super(props)
      this.tabManager = new TabManager()
      this.tabData = this.tabManager.newTab(tabData || {})
    }

    componentDidMount () {
      document.addEventListener('onbeforeunload', () => {
        this.tabManager.removeTab(this.tabData.id)
      })
    }

    componentWillUnmount () {
      document.removeEventListener('onbeforeunload', () => {
        this.tabManager.removeTab(this.tabData.id)
      })
    }

    render () {
      return (<ComposedComponent tabData={this.tabData} tabManager={this.tabManager} {...this.props} />)
    }
  }

  return TabManagerWrapperComponent
}

export default TabManagerWrapper

