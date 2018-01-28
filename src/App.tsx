import * as React from 'react';
import './App.css';

interface Props {
    children: React.ReactNode;
}

class App extends React.Component<Props, {}> {
    render() {
        const {children} = this.props;
        return (
            <div className="App">
                AppHeader
                {children}
            </div>
        );
    }
}

export default App;