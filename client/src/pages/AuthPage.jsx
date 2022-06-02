import React from 'react';

export const AuthPage = () => {
  return(
    <div className='row'>
      <div className="col s6 offset-s3">
        <h1>Сократи ссылку</h1>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Введите email"
                  id="email"
                  type="text"
                  className="validate yellow-input"
                  name='email'
                />
                  <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  className="validate yellow-input"
                  name='password'
                />
                  <label htmlFor="email">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
              <button className='btn yellow darken-4' style={{marginRight: 10}}>Войти</button>
              <button className='btn grey lighten-1 black-text'>Зарегистрироваться</button>
          </div>
        </div>
      </div>
    </div>
  )
}