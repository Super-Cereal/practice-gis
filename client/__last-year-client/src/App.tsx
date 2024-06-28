import './App.css';
import { CommandBar } from "./components/CommandBar";
import { MapBox } from "./components/MapBox";
import { Properties } from "./components/Properties";

function App() {
	return (
		<div className="w-100 h-100 d-flex flex-column">
			<CommandBar />
			<div className="flex-grow-1 d-flex overflow-hidden">
				<div className="h-100">
					<Properties />
				</div>
				<div className="h-100 flex-grow-1">
					<MapBox />
				</div>
			</div>
		</div>
	);
}

export default App;
