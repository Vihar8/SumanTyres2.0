import React from 'react'
import ContainerAdmin from '../commoncomponents/Container/ContainerAdmin'
import TyresList from '../components/tyre/TyresList'

const TyreList = () => {
  return (
    <React.Fragment>
        <ContainerAdmin >
            <TyresList />
        </ContainerAdmin>
    </React.Fragment>
  )
}

export default TyreList
