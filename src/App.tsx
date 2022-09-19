import ThemeWrapper from "./components/Theme/ThemeWrapper";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

import "./App.css";

function App() {
  return (
    <ThemeWrapper>
      <div className="max-w-7xl mx-auto relative">
        <Header />
        <Main />
        <Footer />
      </div>
    </ThemeWrapper>
  );
}

export default App;
