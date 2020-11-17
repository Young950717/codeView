import { createElement, render, renderDom } from './virtuaDom'
import domDiff from './domDIff'
import doPAtch from './doPAtch'
const vDom1 = createElement('ul', {
    class: 'list',
    style: 'width:300px; height:300px; background-color:skyblue;'
},
    [
        createElement('li',
            { class: 'item', 'data-index': 0 },
            [
                createElement('p', { class: 'text' },
                    ['第一个列表页'])
            ]
        ),
        createElement('li',
            { class: 'item', 'data-index': 1 },
            [
                createElement('p',
                    { class: 'text' },
                    [
                        createElement('span',
                            { class: 'title' },
                            ['第二个列表项'])
                    ])
            ]),
        createElement('li',
            { class: 'item', 'data-index': 2 },
            ['第三个列表项'])

    ]
)
const vDom2 = createElement('ul', {
    class: 'list-warp',
    style: 'width:300px; height:300px; background-color:skyblue;'
},
    [
        createElement('li',
            { class: 'item', 'data-index': 0 },
            [
                createElement('p', { class: 'title' },
                    ['特殊列表页'])
            ]
        ),
        createElement('li',
            { class: 'item', 'data-index': 1 },
            [
                createElement('p',
                    { class: 'text' },
                    []
                )
            ]),
        createElement('div',
            { class: 'item', 'data-index': 2 },
            ['第三个列表项'])

    ]
)
const rDom = render(vDom1)
renderDom(rDom,
    document.querySelector('#app')
)

const patches = domDiff(vDom1, vDom2)
doPAtch(rDom, patches)