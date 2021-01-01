switch (ReactDOM.querySelector("#root")) {
| Some(root) => ReactDOM.render(<TodoApp />, root)
| None => ()
};
