// import globalReducer from "./globalreducer"

export type Unit = {
  name: string
  life: number
  damage: number
  abilities: []
}

interface IUnitReducer {
  changeLife(unit:Unit, lifeChange:number):Unit
}

export const reducer:IUnitReducer = {

  changeLife: (unit:Unit, lifeChange:number):Unit => unit

}

// export default globalReducer(
//   // Load cards from local storage
//   // JSON.parse(localStorage.getItem("cards") || "[]"),
//   [],
//   reducer
//   // On state change, persist to local storage
//   // cards => localStorage.setItem("cards", JSON.stringify(cards))
// )
