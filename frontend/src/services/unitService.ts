
import { gql } from '@apollo/client';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

type ServerUnit = {
  name: string,
  maxlife: number,
  // abilities: Ability
}

interface IUnit {
  name: string
  maxlife: number
  life: number
}

class Unit implements IUnit {

  public name: string
  public maxlife: number
  public life: number

  constructor (serverunit:ServerUnit) {
    this.name = serverunit.name
    this.life = serverunit.maxlife
    this.maxlife = serverunit.maxlife
  }

}

export interface IUnitService {
  getUnits(addUnits:Function):Promise<any>
  initializeUnits(units:ServerUnit[]):IUnit[]
}

export class UnitService implements IUnitService {

  private apolloClient:ApolloClient<NormalizedCacheObject>

  constructor (apolloClient:ApolloClient<NormalizedCacheObject>) {
    this.apolloClient = apolloClient
  }

  // gets All Units from Server
  public getUnits = (addUnits:Function):Promise<any> =>
    this.apolloClient.query({
        query: gql`{
            units {
              name
              maxlife
            }
          }`
      })
      .then(res => addUnits(res.data.units as ServerUnit[]))
      .catch(() => false)

  public initializeUnits = (units:ServerUnit[]):IUnit[] =>
    units.map(unit => new Unit(unit))

}
