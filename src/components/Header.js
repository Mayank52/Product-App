import React from 'react'
import styled from 'styled-components'

export default function Header() {
    return (
        <Container>
            <HeaderLink>Add Product</HeaderLink>
            <HeaderLink>My Products</HeaderLink>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
`
const HeaderLink = styled.div`
    margin: 5px;
`