import React from 'react'

export const Element = React.createElement

export const render = Element
export const execIf = (predicate, fn) => predicate && fn()
export const map = fn => xs => xs.map(fn)
export const renderIf = (predicate, toRender) =>
  execIf(predicate, render(toRender))
export const renderIfs = map(renderIf)

export const Div = Element('div')
export const Wrapper = Div({ className: 'wrapper' })
export const Icon = Div({ className: 'icon' })
export const SadFaceIcon = Icon({ key: 'sad-face' })
export const Title = Div({ className: 'title' })
export const Body = Div({ className: 'body' })

export const Message = ({ icon, title, body }) =>
  Wrapper(
    Div({
      className: 'message',
      children: renderIfs([[icon, Icon], [title, Title], [body, Body]]),
    })
  )
