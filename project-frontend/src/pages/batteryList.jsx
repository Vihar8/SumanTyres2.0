import React from 'react'
import ContainerAdmin from '../commoncomponents/Container/ContainerAdmin'
import BatterysList from '../components/battery/BatterysList'

const BatteryList = () => {
  return (
    <React.Fragment>
        <ContainerAdmin >
            <BatterysList />
        </ContainerAdmin>
    </React.Fragment>
  )
}

export default BatteryList
