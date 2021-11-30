type clientMessage =
  | Start(string)
  | Predict(LinAlg.Matrix.t)

type workerMessage =
  | Ack(array<NIST.sample>)
  | Update(LinAlg.Matrix.t, LinAlg.Matrix.t, float)
  | Prediction(LinAlg.Matrix.t, LinAlg.Matrix.t)

module ClientMessage = {
  type t
  @get external data: t => clientMessage = ""
}

module WorkerMessage = {
  type t
  @get external data: t => workerMessage = ""
}
type webWorker = {"onmessage": unit => {.}}

@new external create: string => webWorker = "Worker"
@set
external setOnMessage: (webWorker, WorkerMessage.t => unit) => unit = "onmessage"
@send external terminate: webWorker => unit = "terminate"
@send
external postMessage: (webWorker, clientMessage) => unit = "postMessage"

module NISTClient = {
  let start = onUpdate => {
    let worker = create("/src/BoostrapWorker.bs.js")
    setOnMessage(worker, m => onUpdate(WorkerMessage.data(m)))
    postMessage(worker, Start("0. Start Worker From the Client"))
    (m => postMessage(worker, m), () => terminate(worker))
  }
}
