import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <a href="https://corp.yourtory.com/" target="_blank" rel="noopener noreferrer" className="logo-link">
          <img src="/logo-mark.png" alt="Yourtory Logo" className="logo-mark" />
        </a>
      </header>
      <div className="title-container">
        <img src="/title-yourtory.png" alt="Yourtory" className="main-title" />
        <p className="catchphrase">経営者に、右腕を授ける。</p>
      </div>
      <div className="products-container">
        <div className="product-item">
          <a href="https://torynvas.yourtory.com/" target="_blank" rel="noopener noreferrer" className="product-link">
            <img src="/product-torynvas.png" alt="Torynvas" className="product-logo product-logo-torynvas" />
          </a>
          <p className="product-name product-name-torynvas">Torynvas</p>
        </div>
        <div className="product-item">
          <a href="https://torync.yourtory.com/" target="_blank" rel="noopener noreferrer" className="product-link">
            <img src="/product-torync.png" alt="Torync" className="product-logo product-logo-torync" />
          </a>
          <p className="product-name product-name-torync">Torync</p>
        </div>
        <div className="product-item">
          <a href="https://fintory.yourtory.com/signin" target="_blank" rel="noopener noreferrer" className="product-link">
            <img src="/product-fintory.png" alt="Fintory" className="product-logo product-logo-fintory" />
          </a>
          <p className="product-name product-name-fintory">Fintory</p>
        </div>
        <div className="product-item">
          <a href="https://dettory.yourtory.com/" target="_blank" rel="noopener noreferrer" className="product-link">
            <img src="/product-dettory.png" alt="Dettory" className="product-logo product-logo-dettory" />
          </a>
          <p className="product-name product-name-dettory">Dettory</p>
        </div>
      </div>
    </div>
  )
}

export default App
