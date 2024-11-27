import "./App.css";
import {useRive} from "@rive-app/react-canvas";

export const Simple = () => {
    const {RiveComponent} = useRive({
        src: "holo_card.riv",
        stateMachines: "cardInteractivity",
        autoplay: true,
    });
    return <RiveComponent/>;
};
export const Simple2 = () => {
    const {rive, RiveComponent} = useRive({
        src: 'https://cdn.rive.app/animations/vehicles.riv',
        stateMachines: "bumpy",
        autoplay: false,
    });
    return (
        <RiveComponent
            onMouseEnter={() => rive && rive.play()}
            onMouseLeave={() => rive && rive.pause()}
        />
    );
};

export default function App() {
    return (
        <div className="RiveContainer">
            <Simple/>
            <Simple2/>
        </div>
    );
}
