import SearchBar from "material-ui-search-bar";

export default function Search(){
    return(<SearchBar
                value={this.state.value}
                onChange={(newValue) => this.setState({ value: newValue })}
                onRequestSearch={() => doSomethingWith(this.state.value)}
            />);
        }
