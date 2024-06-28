import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { MainPage } from './pages/main';
import { Page } from './shared/ui/page';

import './App.css';

function App() {
    return (
        <BrowserRouter basename="/">
            <Redirects>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/main" element={<MainPage />} />
                </Routes>
            </Redirects>
        </BrowserRouter>
    );
}

const Redirects = ({ children }: React.PropsWithChildren) => {
    if (false) {
        return <Page>Авторизация...</Page>;
    }

    return <>{children}</>;
};

export default App;
