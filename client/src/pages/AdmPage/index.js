import React, { useState } from 'react';
import TopicoAdmin from './topicoAdmin';

function AdmPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ login: '', password: '' });

  const predefinedLogin = 'admin';
  const predefinedPassword = '12345';

  const handleInputChange = (field, value) => {
    setCredentials({ ...credentials, [field]: value });
  };

  const handleLogin = () => {
    if (
      credentials.login === predefinedLogin &&
      credentials.password === predefinedPassword
    ) {
      setIsAuthenticated(true);
    } else {
      alert('Login ou senha incorretos.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-light" style={{ minHeight: '100vh', paddingTop: '80px' }}>
        <div className="d-flex justify-content-center align-items-center">
          <div className="card shadow-sm" style={{ width: '300px' }}>
            <div className="card-body">
              <h3 className="text-center mb-4">Login Administrativo</h3>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Login"
                  value={credentials.login}
                  onChange={(e) => handleInputChange('login', e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Senha"
                  value={credentials.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary w-100"
                onClick={handleLogin}
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <TopicoAdmin />
    </>
  );
}

export default AdmPage;
