// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Header } from "./components/Header";
import { Watchlist } from "./components/Watchlist";
import { Add } from "./components/Add";
import { Watched } from "./components/Watched";
import { GlobalProvider } from "./context/GlobalState";

import "./styles.css";
import "./lib/font-awesome/css/all.min.css";

function AnimatedRoutes() {
  const location = useLocation();

  // ключ важен, чтобы framer-motion понимал смену страницы
  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        <Route
          exact
          path="/"
          render={() => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Watchlist />
            </motion.div>
          )}
        />
        <Route
          path="/add"
          render={() => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Add />
            </motion.div>
          )}
        />
        <Route
          path="/watched"
          render={() => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Watched />
            </motion.div>
          )}
        />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
        <AnimatedRoutes />
      </Router>
    </GlobalProvider>
  );
}

export default App;
