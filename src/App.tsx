import './App.css'
import ScreenComponent from "./components/ScreenComponent.tsx";

function App() {
    return (
        <div>
            <ScreenComponent
                headerText="My Custom Screen"
                initialPosition={{ x: 150, y: 150 }}
                initialSize={{ width: 400, height: 250 }}
                content="This is some content for the screen!"
                headerColor="#2196F3"
            />
            <ScreenComponent
                headerText="My Custom Screen"
                initialPosition={{ x: 750, y: 150 }}
                initialSize={{ width: 400, height: 250 }}
                content="This is some content for the screen!"
                headerColor="#2196F3"
            />
        </div>
    );
}


export default App
