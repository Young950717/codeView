import { createElement, render, renderDom } from './virtuaDom'
const vDom = createElement('ul', {
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
const rDom = render(vDom)
console.log(vDom)
console.log(rDom)
renderDom(rDom,
    document.querySelector('#app')
)