import { useState } from 'react'
import './Card.css'

function Card({ card, listId, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(card.text)
  const [isDragging, setIsDragging] = useState(false)

  const handleBlur = () => {
    if (text.trim()) {
      onUpdate(listId, card.id, text.trim())
    } else {
      setText(card.text)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleBlur()
    }
    if (e.key === 'Escape') {
      setText(card.text)
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <div className="card editing">
        <textarea
          className="card-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
    )
  }

  const handleDragStart = (e) => {
    setIsDragging(true)
    e.dataTransfer.setData('cardId', card.id)
    e.dataTransfer.setData('sourceListId', listId)
    e.dataTransfer.effectAllowed = 'move'
    e.currentTarget.style.opacity = '0.5'
  }

  const handleDragEnd = (e) => {
    setIsDragging(false)
    e.currentTarget.style.opacity = '1'
  }

  const handleCardClick = (e) => {
    if (!isDragging) {
      setIsEditing(true)
    }
  }

  return (
    <div 
      className="card"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className="card-content"
        onClick={handleCardClick}
      >
        {card.text}
      </div>
      <button
        className="delete-card-button"
        onClick={() => onDelete(listId, card.id)}
        title="カードを削除"
      >
        ×
      </button>
    </div>
  )
}

export default Card
