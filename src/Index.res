// Entry point

@val external document: {..} = "document"
let createElement = %raw(`
  function(type) {
    return document.createElement(type);
  }
`)

let appendToHead = %raw(`
  function(child) {
    return document.head.appendChild(child);
  }
`)

let appendToBody = %raw(`
  function(child) {
    return document.body.appendChild(child);
  }
`)

let appendToContainer = %raw(`
  function(container,child) {
    return container.appendChild(child);
  }
`)

// We're using raw DOM manipulations here, to avoid making you read
// ReasonReact when you might precisely be trying to learn it for the first
// time through the examples later.
let style = createElement("style")
appendToHead(style)
style["innerHTML"] = ExampleStyles.style

let makeContainer = text => {
  let container = createElement("div")
  container["className"] = "container"

  let title = createElement("div")
  title["className"] = "containerTitle"
  title["innerText"] = text

  let content = createElement("div")
  content["className"] = "containerContent"

  let () = appendToContainer(container, title)
  let () = appendToContainer(container, content)
  let () = appendToBody(container)

  content
}

ReactDOMRe.render(<DetectDigits />, makeContainer("NIST"))
ReactDOMRe.render(
  <StartStop> <LogisticRegression /> </StartStop>,
  makeContainer("Logistic Regression"),
)
ReactDOMRe.render(<StartStop> <LinearRegression /> </StartStop>, makeContainer("Linear Regression"))
