import React from 'react'

const About = (props) => {
    return (
        <>
            <button onClick={() => props.setCount(props.count + 1)}>Tambah</button>
            <p>{props.count}</p>
            <button onClick={() => props.setCount(props.count > 0 ? props.count - 1 : 0)}>Kurang</button>
        </>
    )
}

export default About
