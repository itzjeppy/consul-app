import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {MantineProvider, Container} from '@mantine/core';
import Dashboard from './Components/Dashboard/Dashboard';
import NavBar from './Components/Global/NavBar';
import ProfilePage from './Components/Profile/ProfilePage';

export default function App() {
    return (
        <MantineProvider defaultColorScheme="light">
            <Router>
                <NavBar/>
                <Container size="lg" py="xl">
                    <Routes>
                        <Route path="/"
                            element={<Dashboard/>}/> {/* Add more routes here if needed */}
                        <Route path="/profile"
                            element={<ProfilePage/>}/>
                    </Routes>
                </Container>
            </Router>
        </MantineProvider>
    );
}
