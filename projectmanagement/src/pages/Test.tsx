import useAuthStore from '../components/useAuthStore';
import { useState } from 'react';
export default function Test() {
   const { user, login, register, logout, resetPassword, loading, error } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    login(email, password)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    register(name, email, password)
  }

  const handleReset = (e) => {
    e.preventDefault()
    resetPassword(email)
  }

  if (user) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Welcome, {user.name}</h2>
        <p>Email: {user.email}</p>
        <button onClick={logout}>Logout</button>
      </div>
    )
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Zustand Auth Test</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading...</p>}

      <h3>Register</h3>
      <form onSubmit={handleRegister}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>

      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      <h3>Reset Password</h3>
      <form onSubmit={handleReset}>
        <input
          placeholder="Email for reset"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Reset</button>
      </form>
    </div>
  )
}