import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [items, setItems] = useState([
    {
      id: 'e1qw3',
      phrase: `Сказочное заморское яство`,
      title: 'Нямушка',
      ingredient: 'с фуа-гра',
      descriptions: ['10 порций', 'мышь в подарок'],
      weightNumber: '0,5',
      weightWord: 'кг',
      disabled: false,
      footerDesc: 'Печень утки разварная с артишоками.'
    },
    {
      id: 'a1s23d',
      phrase: `Сказочное заморское яство`,
      title: 'Нямушка',
      ingredient: 'с рыбой',
      descriptions: ['40 порций', '2 мыши в подарок'],
      weightNumber: '2',
      weightWord: 'кг',
      disabled: false,
      footerDesc: 'Головы щучьи с чесноком да свежайшая сёмгушка.'
    },
    {
      id: 'zx5c4',
      phrase: `Сказочное заморское яство`,
      title: 'Нямушка',
      ingredient: 'с курой',
      descriptions: ['100 порций', '5 мышей в подарок', 'заказчик доволен'],
      weightNumber: '5',
      weightWord: 'кг',
      disabled: true,
      footerDesc: 'Филе из цыплят с трюфелями в бульоне.'
    }
  ])

  const [selected, setSelected] = useState([])
  const [justHovered, setJustHovered] = useState(false) 
  const [phrases] = useState({
    unhover: 'Сказочное заморское яство',
    hover: 'Котэ не одобряет?',
  })

  const numbersToBold = (str) => {
    return (str.split(' ')
      .map(word => { return isNaN(word) ? word : word.bold() })
      .join(' '))
  }

  const toggleSelect = (target, id, fromText) => {
    const element = target
    const item_id = id
    const selected_items = selected
    const index = selected_items.indexOf(item_id)

    if (index === -1) {
      setSelected([item_id, ...selected])
      element.classList.add('selected')
      if (!fromText) setJustHovered(true)
    } else {
      selected_items.splice(selected_items.indexOf(item_id), 1)
      setSelected(selected_items)
      element.classList.remove('selected')
      handleUnhover(target, item_id)
    }
  }

  const handleHover = (target, id) => {
    const currItems = items.map(item => {
      if (item.id === id && target.classList.contains('selected') && !justHovered) {
        item.phrase = phrases.hover
        target.classList.add('on-selected-hover')
      }
      return item
    })
    setItems(currItems)
  }

  const handleUnhover = (target, id) => {
    const currItems = items.map(item => {
      if (item.id === id) {
        item.phrase = phrases.unhover
        target.classList.remove('on-selected-hover')
      }
      return item
    })
    setJustHovered(false)
    setItems(currItems)
  }

  const footerPhrases = (type, item) => {
    switch (type) {
      case 'default':
        return (
          <>
            Чего сидишь? Порадуй котэ <span
              onClick={e => toggleSelect(document.getElementsByClassName(item.id)[0], item.id, true)}
              className="buy-text">купи.
              </span>
          </>)
      case 'disabled':
        return (<span className='disabled-footer-text'>Печалька, {item.ingredient} закончился</span>)
      case 'selected':
        return (item.footerDesc)
    }
  }

  return (
    <div className="background">
      <div className="background-shadow">
        <div className="page-content">
          <div className="page-title">
            Ты сегодня покормил кота?
        </div>
          <div className="container">
            {items.map(item => {
              return (
                <div className="item" key={item.id}>
                  <div className={`card ${item.id} ${item.disabled ? 'disabled' : ''}`}
                    onMouseOver={(e) => item.disabled ? null : handleHover(e.currentTarget, item.id)}
                    onMouseLeave={(e) => item.disabled ? null : handleUnhover(e.currentTarget, item.id)}
                    onClick={(e) => item.disabled ? null : toggleSelect(e.currentTarget, item.id)}
                    key={item.id}>
                    <div className="main-text">
                      <div className="phrase">
                        {item.phrase}
                      </div>
                      <div className="title">
                        {item.title}
                      </div>
                      <div className="ingredient">
                        {item.ingredient}
                      </div>
                      <div className="description">
                        {item.descriptions.map(str =>
                          <div key={str} dangerouslySetInnerHTML={{ __html: numbersToBold(str) }}>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="weight">
                      <span className="number">{item.weightNumber}</span>
                      <br />
                      <span className="word">{item.weightWord}</span>
                    </div>
                  </div>
                  <div className="footer-text">
                    {item.disabled ? footerPhrases('disabled', item) :
                      selected.indexOf(item.id) !== -1 ?
                        footerPhrases('selected', item) : footerPhrases('default', item)
                    }

                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
