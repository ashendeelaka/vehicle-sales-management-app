
import './App.css'
import { AuthContextProvider } from './context/AuthContext'
import AppRoutes from './routes/AppRoutes'

function App() {
    return (
        <>
            <AuthContextProvider>
                <AppRoutes />
            </AuthContextProvider>
        </>
    )
}

export default App
