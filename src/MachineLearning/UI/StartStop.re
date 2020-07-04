[@react.component]
let make = (~children) => {
  let (status, setStatus) = React.useState(() => false);
  <div>
    <button onClick={_ => setStatus(prev => !prev)}>
      {React.string(status ? "Pause" : "Start")}
    </button>
    {status ? children : React.null}
  </div>;
};