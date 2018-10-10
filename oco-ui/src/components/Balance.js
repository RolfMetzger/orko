import React from "react"
import styled from "styled-components"
import Amount from "./primitives/Amount"
import Para from "./primitives/Para"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`

export const Balance = props => {
  const coin = props.coin

  const noBalances = !props.balance || !props.coin

  const noBaseBalance =
    noBalances || (!props.balance[coin.base] && props.balance[coin.base] !== 0)
  const noCounterBalance =
    noBalances ||
    (!props.balance[coin.counter] && props.balance[coin.counter] !== 0)

  if (coin) {
    return (
      <Container>
        <Amount
          fontSize={1}
          name="Total"
          onClick={props.onClickNumber}
          coin={coin}
        >
          {noBaseBalance ? undefined : props.balance[coin.base].total}
        </Amount>
        <Amount
          fontSize={1}
          name="Available"
          onClick={props.onClickNumber}
          coin={coin}
        >
          {noBaseBalance ? undefined : props.balance[coin.base].available}
        </Amount>
        <Amount
          fontSize={1}
          coin={coin}
          name={coin.counter + " total"}
          onClick={props.onClickNumber}
        >
          {noCounterBalance ? undefined : props.balance[coin.counter].total}
        </Amount>
        <Amount
          fontSize={1}
          coin={coin}
          name={coin.counter + " available"}
          onClick={props.onClickNumber}
        >
          {noCounterBalance ? undefined : props.balance[coin.counter].available}
        </Amount>
        <Amount
          fontSize={1}
          name="Can buy"
          onClick={props.onClickNumber}
          coin={coin}
        >
          {noCounterBalance || !props.ticker
            ? undefined
            : props.balance[coin.counter].available / props.ticker.ask}
        </Amount>
      </Container>
    )
  } else {
    return <Para>No coin selected</Para>
  }
}

export default Balance
