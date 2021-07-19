import React from 'react'

const UsernameInput = (props) => {

    const {value, change} = props

    return (
        <label>
            Username
            <input 
                type='text'
                id='username'
                name='username'
                value={value}
                onChange={change}
                placeholder='Lambda'
            />
        </label>
        
    )

}

export default UsernameInput;