import React, { useState } from 'react'

const Note = (props) => {
    console.log(props)
    return (
        <li> {props.name} </li>
    )
}

export default Note