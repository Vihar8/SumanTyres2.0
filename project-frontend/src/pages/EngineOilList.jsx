import React from 'react'
import ContainerAdmin from '../commoncomponents/Container/ContainerAdmin'
import EngineOilLists from '../components/EngineOil/EngineOilLists'

const EngineOilList = () => {
  return (
    <React.Fragment>
        <ContainerAdmin >
            <EngineOilLists />
        </ContainerAdmin>
    </React.Fragment>
  )
}

export default EngineOilList
