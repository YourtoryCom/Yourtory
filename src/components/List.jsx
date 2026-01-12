import { useState } from 'react'
import './List.css'
import Card from './Card'

function List({ list, onUpdateTitle, onDelete, onAddCard, onUpdateCard, onDeleteCard, onMoveCard }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [title, setTitle] = useState(list.title)
  const [showAddCard, setShowAddCard] = useState(false)
  const [newCardText, setNewCardText] = useState('')
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  const handleTitleBlur = () => {
    if (title.trim()) {
      onUpdateTitle(list.id, title)
    } else {
      setTitle(list.title)
    }
    setIsEditingTitle(false)
  }

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleTitleBlur()
    }
  }

  const handleAddCard = () => {
    if (newCardText.trim()) {
      onAddCard(list.id, newCardText.trim())
      setNewCardText('')
      setShowAddCard(false)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDraggingOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDraggingOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDraggingOver(false)
    const sourceListId = e.dataTransfer.getData('sourceListId')
    const cardId = e.dataTransfer.getData('cardId')
    
    if (sourceListId && cardId) {
      onMoveCard(sourceListId, cardId, list.id)
    }
  }

  return (
    <div 
      className={`list ${isDraggingOver ? 'dragging-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="list-header">
        {isEditingTitle ? (
          <input
            className="list-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            autoFocus
          />
        ) : (
          <h2
            className="list-title"
            onClick={() => setIsEditingTitle(true)}
          >
            {list.title}
          </h2>
        )}
        <button
          className="delete-list-button"
          onClick={() => onDelete(list.id)}
          title="リストを削除"
        >
          ×
        </button>
      </div>
      <div className="cards-container">
        {list.cards.map(card => (
          <Card
            key={card.id}
            card={card}
            listId={list.id}
            onUpdate={onUpdateCard}
            onDelete={onDeleteCard}
          />
        ))}
        {list.cards.length === 0 && (
          <div className="empty-list-placeholder">
            カードをドロップ
          </div>
        )}
      </div>
      {showAddCard ? (
        <div className="add-card-form">
          <textarea
            className="card-input"
            value={newCardText}
            onChange={(e) => setNewCardText(e.target.value)}
            placeholder="カードのタイトルを入力..."
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleAddCard()
              }
              if (e.key === 'Escape') {
                setShowAddCard(false)
                setNewCardText('')
              }
            }}
          />
          <div className="add-card-actions">
            <button className="add-card-button" onClick={handleAddCard}>
              カードを追加
            </button>
            <button
              className="cancel-button"
              onClick={() => {
                setShowAddCard(false)
                setNewCardText('')
              }}
            >
              キャンセル
            </button>
          </div>
        </div>
      ) : (
        <button
          className="add-card-trigger"
          onClick={() => setShowAddCard(true)}
        >
          + カードを追加
        </button>
      )}
    </div>
  )
}

export default List
